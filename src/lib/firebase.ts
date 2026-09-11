import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer, 
  setDoc,
  onSnapshot, 
  runTransaction,
  Unsubscribe 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { INITIAL_SENTIMENT_TOPICS } from '../data/sentimentPollsData';
import { SentimentTopicId } from '../types/sentiment';

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

// Atomically cast ballot: Locks the ballot permanently in Firestore
export async function castLockedBallot(
  topicId: SentimentTopicId,
  choice: 'A' | 'B' | 'C' | 'D',
  ward: string
): Promise<{ success: boolean; message: string }> {
  const voterToken = getVoterToken();
  const ballotId = `${topicId}_${voterToken}`;
  const ballotRef = doc(db, 'voter_ballots', ballotId);
  const topicRef = doc(db, 'sentiment_topics', topicId);

  try {
    await runTransaction(db, async (transaction) => {
      // 1. Verify ballot does not already exist
      const existingBallot = await transaction.get(ballotRef);
      if (existingBallot.exists()) {
        throw new Error('DUPLICATE_BALLOT: You have already cast and locked your vote for this topic.');
      }

      // 2. Read or initialize topic tally
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

      // Increment the chosen vote atomically
      totalVotes += 1;
      if (choice === 'A') votesA += 1;
      else if (choice === 'B') votesB += 1;
      else if (choice === 'C') votesC += 1;
      else if (choice === 'D') votesD += 1;

      // 3. Write new topic totals
      transaction.set(topicRef, {
        id: topicId,
        totalVotes,
        votesA,
        votesB,
        votesC,
        votesD,
        updatedAt: new Date().toISOString()
      });

      // 4. Write immutable voter ballot
      transaction.set(ballotRef, {
        topicId,
        choice,
        voterToken,
        ward,
        votedAt: new Date().toISOString()
      });
    });

    return { success: true, message: 'Ballot locked & registered in Cloud Firestore.' };
  } catch (error) {
    if (error instanceof Error && error.message.includes('DUPLICATE_BALLOT')) {
      return { success: false, message: 'Vote already cast for this topic' };
    }
    handleFirestoreError(error, OperationType.WRITE, `voter_ballots/${ballotId}`);
  }
}

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
