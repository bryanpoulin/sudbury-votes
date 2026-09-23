import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer, 
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  onSnapshot, 
  runTransaction,
  Unsubscribe 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { INITIAL_SENTIMENT_TOPICS } from '../data/sentimentPollsData';
import { INITIAL_CIVIC_IDEAS } from '../data/civicIdeasData';
import { SentimentTopicId, CivicIdea, CivicThemeId } from '../types/sentiment';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Standardized error handler
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    // Attempt reading from test collection
    await getDocFromServer(doc(db, 'sentiment_topics', '_connection_check'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client is offline or connecting...');
      return false;
    }
    // Permission denied or not found is normal for test doc; signifies server is reachable
    return true;
  }
}

// Generate or retrieve persistent voter token
const VOTER_TOKEN_KEY = 'sudbury_civic_voter_token_v1';

export function clearVoterToken(): void {
  try {
    localStorage.removeItem(VOTER_TOKEN_KEY);
  } catch {}
}

export function getVoterToken(): string {
  try {
    let token = localStorage.getItem(VOTER_TOKEN_KEY);
    if (!token) {
      const entropy = [
        Math.random().toString(36).substring(2, 15),
        Date.now().toString(36),
        navigator.language || 'en',
        screen.width + 'x' + screen.height
      ].join('_');
      // Create clean alphanumeric hash-like ID
      token = 'vt_' + btoa(entropy).replace(/[^a-zA-Z0-9_]/g, '').substring(0, 32);
      localStorage.setItem(VOTER_TOKEN_KEY, token);
    }
    return token;
  } catch {
    return 'vt_fallback_' + Math.random().toString(36).substring(2, 10);
  }
}

export interface LiveTopicVotes {
  totalVotes: number;
  votesA: number;
  votesB: number;
  votesC: number;
  votesD: number;
}

// Subscribe to real-time topic votes
export function subscribeToTopicVotes(
  topicId: SentimentTopicId,
  onUpdate: (data: LiveTopicVotes) => void
): Unsubscribe {
  const topicRef = doc(db, 'sentiment_topics', topicId);
  
  return onSnapshot(
    topicRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate({
          totalVotes: Number(data.totalVotes) || 0,
          votesA: Number(data.votesA) || 0,
          votesB: Number(data.votesB) || 0,
          votesC: Number(data.votesC) || 0,
          votesD: Number(data.votesD) || 0,
        });
      } else {
        // Use base seed if not yet created in cloud
        const base = INITIAL_SENTIMENT_TOPICS[topicId].cityWide;
        onUpdate({
          totalVotes: base.total,
          votesA: base.A,
          votesB: base.B,
          votesC: base.C,
          votesD: base.D,
        });
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, `sentiment_topics/${topicId}`);
    }
  );
}

// Check if user has already cast a ballot for this topic in Cloud Firestore
export async function checkHasVotedInCloud(
  topicId: SentimentTopicId,
  voterToken: string
): Promise<{ hasVoted: boolean; choice?: string }> {
  const ballotId = `${topicId}_${voterToken}`;
  const ballotRef = doc(db, 'voter_ballots', ballotId);

  try {
    const snapshot = await getDoc(ballotRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return { hasVoted: true, choice: data.choice };
    }
    return { hasVoted: false };
  } catch (error) {
    console.warn('Could not check ballot in cloud, using local cache:', error);
    return { hasVoted: false };
  }
}

// Atomically cast or update ballot in Firestore
export async function castOrUpdateBallot(
  topicId: SentimentTopicId,
  choice: 'A' | 'B' | 'C' | 'D',
  ward: string,
  previousChoice?: 'A' | 'B' | 'C' | 'D'
): Promise<{ success: boolean; message: string; isUpdate: boolean }> {
  const voterToken = getVoterToken();
  const ballotId = `${topicId}_${voterToken}`;
  const ballotRef = doc(db, 'voter_ballots', ballotId);
  const topicRef = doc(db, 'sentiment_topics', topicId);

  try {
    let isUpdate = false;
    await runTransaction(db, async (transaction) => {
      // 1. Read existing ballot
      const existingBallot = await transaction.get(ballotRef);
      let priorChoice = previousChoice;
      if (existingBallot.exists()) {
        isUpdate = true;
        priorChoice = existingBallot.data().choice as 'A' | 'B' | 'C' | 'D';
      }

      // If choice hasn't changed, no update needed
      if (isUpdate && priorChoice === choice) {
        return;
      }

      // 2. Read topic tally
      const topicSnap = await transaction.get(topicRef);
      const base = INITIAL_SENTIMENT_TOPICS[topicId].cityWide;

      let totalVotes = base.total;
      let votesA = base.A;
      let votesB = base.B;
      let votesC = base.C;
      let votesD = base.D;

      if (topicSnap.exists()) {
        const d = topicSnap.data();
        totalVotes = Number(d.totalVotes) || totalVotes;
        votesA = Number(d.votesA) || votesA;
        votesB = Number(d.votesB) || votesB;
        votesC = Number(d.votesC) || votesC;
        votesD = Number(d.votesD) || votesD;
      }

      // If updating, decrement old choice
      if (isUpdate && priorChoice) {
        if (priorChoice === 'A' && votesA > 0) votesA -= 1;
        else if (priorChoice === 'B' && votesB > 0) votesB -= 1;
        else if (priorChoice === 'C' && votesC > 0) votesC -= 1;
        else if (priorChoice === 'D' && votesD > 0) votesD -= 1;
      } else {
        // New ballot increment
        totalVotes += 1;
      }

      // Increment new choice
      if (choice === 'A') votesA += 1;
      else if (choice === 'B') votesB += 1;
      else if (choice === 'C') votesC += 1;
      else if (choice === 'D') votesD += 1;

      // 3. Write new topic totals
      transaction.set(topicRef, {
        id: topicId,
        totalVotes: Math.max(0, totalVotes),
        votesA: Math.max(0, votesA),
        votesB: Math.max(0, votesB),
        votesC: Math.max(0, votesC),
        votesD: Math.max(0, votesD),
        updatedAt: new Date().toISOString()
      });

      // 4. Write/update voter ballot
      transaction.set(ballotRef, {
        topicId,
        choice,
        voterToken,
        ward,
        votedAt: new Date().toISOString()
      });
    });

    return { 
      success: true, 
      message: isUpdate ? 'Your ballot has been updated.' : 'Your ballot has been recorded.', 
      isUpdate 
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `voter_ballots/${ballotId}`);
    return { success: false, message: 'Failed to record ballot in cloud.', isUpdate: false };
  }
}

// Backward-compatible alias
export const castLockedBallot = (topicId: SentimentTopicId, choice: 'A' | 'B' | 'C' | 'D', ward: string) => 
  castOrUpdateBallot(topicId, choice, ward);

// Reset all sentiment topic records in Cloud Firestore strictly back to 0
export async function resetAllTopicsToZero(): Promise<{ success: boolean; message: string }> {
  const topics: SentimentTopicId[] = ['arena', 'roads', 'housing', 'taxes'];
  try {
    const promises = topics.map(async (topicId) => {
      const topicRef = doc(db, 'sentiment_topics', topicId);
      await setDoc(topicRef, {
        id: topicId,
        totalVotes: 0,
        votesA: 0,
        votesB: 0,
        votesC: 0,
        votesD: 0,
        updatedAt: new Date().toISOString()
      });
    });
    await Promise.all(promises);
    return { success: true, message: 'All civic sentiment poll tables and database counts successfully reset to 0.' };
  } catch (error) {
    console.error('Error resetting database to zero:', error);
    return { success: false, message: 'Failed to reset cloud tables.' };
  }
}

// ==========================================
// LIVE CIVIC IDEA & PRIORITY BOARD FUNCTIONS
// ==========================================

const SECONDED_IDEAS_KEY = 'sudbury_seconded_ideas_v1';

export function getLocalSecondedIdeaIds(): string[] {
  try {
    const raw = localStorage.getItem(SECONDED_IDEAS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalSecondedIdeaId(ideaId: string, isSeconded: boolean): void {
  try {
    const current = getLocalSecondedIdeaIds();
    const updated = isSeconded 
      ? Array.from(new Set([...current, ideaId]))
      : current.filter(id => id !== ideaId);
    localStorage.setItem(SECONDED_IDEAS_KEY, JSON.stringify(updated));
  } catch {}
}

// Subscribe to real-time civic ideas feed
export function subscribeToCivicIdeas(
  onUpdate: (ideas: CivicIdea[]) => void
): Unsubscribe {
  const ideasCol = collection(db, 'civic_ideas');

  return onSnapshot(
    ideasCol,
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate(INITIAL_CIVIC_IDEAS);
        seedInitialCivicIdeas();
      } else {
        const loaded: CivicIdea[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          if (d.status !== 'hidden') {
            loaded.push({
              id: docSnap.id,
              title: d.title || '',
              description: d.description || '',
              ward: d.ward || 'all',
              theme: (d.theme as CivicThemeId) || 'community',
              secondsCount: Number(d.secondsCount) || 0,
              authorToken: d.authorToken || '',
              createdAt: d.createdAt || new Date().toISOString(),
              status: d.status || 'active',
              isBenchmark: Boolean(d.isBenchmark)
            });
          }
        });
        loaded.sort((a, b) => b.secondsCount - a.secondsCount);
        onUpdate(loaded);
      }
    },
    (error) => {
      console.warn('Falling back to local seed ideas:', error);
      onUpdate(INITIAL_CIVIC_IDEAS);
    }
  );
}

// Background seeder for Firestore
async function seedInitialCivicIdeas(): Promise<void> {
  try {
    for (const idea of INITIAL_CIVIC_IDEAS) {
      const ideaRef = doc(db, 'civic_ideas', idea.id);
      await setDoc(ideaRef, idea);
    }
  } catch (err) {
    console.warn('Notice: Firestore seed will sync on write:', err);
  }
}

// Submit a new citizen priority idea
export async function submitCivicIdea(data: {
  title: string;
  description: string;
  ward: string;
  theme: CivicThemeId;
}): Promise<{ success: boolean; id?: string; message: string }> {
  const voterToken = getVoterToken();
  const cleanId = 'idea_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
  const ideaRef = doc(db, 'civic_ideas', cleanId);

  const newIdea: CivicIdea = {
    id: cleanId,
    title: data.title.trim().substring(0, 120),
    description: data.description.trim().substring(0, 600),
    ward: data.ward || 'all',
    theme: data.theme,
    secondsCount: 1,
    authorToken: voterToken,
    createdAt: new Date().toISOString(),
    status: 'active',
    isBenchmark: false
  };

  try {
    await setDoc(ideaRef, newIdea);
    
    // Record author's second in civic_idea_seconds
    const secondId = `${cleanId}_${voterToken}`;
    const secondRef = doc(db, 'civic_idea_seconds', secondId);
    await setDoc(secondRef, {
      ideaId: cleanId,
      voterToken,
      secondedAt: new Date().toISOString()
    });

    saveLocalSecondedIdeaId(cleanId, true);

    return { 
      success: true, 
      id: cleanId, 
      message: 'Your priority has been published to the Live Civic Board!' 
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `civic_ideas/${cleanId}`);
    return { 
      success: false, 
      message: 'Failed to publish priority. Please check your connection and try again.' 
    };
  }
}

// Toggle "I Second This" (+1 Support) for an idea
export async function toggleSecondCivicIdea(
  ideaId: string
): Promise<{ success: boolean; isSeconded: boolean; newCount: number }> {
  const voterToken = getVoterToken();
  const secondId = `${ideaId}_${voterToken}`;
  const secondRef = doc(db, 'civic_idea_seconds', secondId);
  const ideaRef = doc(db, 'civic_ideas', ideaId);

  try {
    let nowSeconded = false;
    let finalCount = 0;

    await runTransaction(db, async (transaction) => {
      const secondSnap = await transaction.get(secondRef);
      const ideaSnap = await transaction.get(ideaRef);

      let currentSeconds = 0;
      if (ideaSnap.exists()) {
        currentSeconds = Number(ideaSnap.data().secondsCount) || 0;
      } else {
        const seed = INITIAL_CIVIC_IDEAS.find(i => i.id === ideaId);
        currentSeconds = seed ? seed.secondsCount : 0;
      }

      if (secondSnap.exists()) {
        nowSeconded = false;
        finalCount = Math.max(0, currentSeconds - 1);
        transaction.delete(secondRef);
      } else {
        nowSeconded = true;
        finalCount = currentSeconds + 1;
        transaction.set(secondRef, {
          ideaId,
          voterToken,
          secondedAt: new Date().toISOString()
        });
      }

      if (ideaSnap.exists()) {
        transaction.update(ideaRef, {
          secondsCount: finalCount
        });
      } else {
        const seed = INITIAL_CIVIC_IDEAS.find(i => i.id === ideaId);
        if (seed) {
          transaction.set(ideaRef, {
            ...seed,
            secondsCount: finalCount
          });
        }
      }
    });

    saveLocalSecondedIdeaId(ideaId, nowSeconded);
    return { success: true, isSeconded: nowSeconded, newCount: finalCount };
  } catch (error) {
    console.error('Error toggling second on idea:', error);
    const isCurrentlySeconded = getLocalSecondedIdeaIds().includes(ideaId);
    const nextState = !isCurrentlySeconded;
    saveLocalSecondedIdeaId(ideaId, nextState);
    return { success: true, isSeconded: nextState, newCount: nextState ? 1 : 0 };
  }
}

