import React, { useState, useEffect, useMemo } from 'react';
import { 
  PlusCircle, 
  ThumbsUp, 
  Filter, 
  Flame, 
  Clock, 
  Search, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  MapPin, 
  ExternalLink,
  ChevronDown,
  Layers,
  HelpCircle,
  Copy,
  Check,
  Send,
  X
} from 'lucide-react';
import { CivicIdea, CivicThemeId } from '../types/civicIdeas';
import { CIVIC_THEMES } from '../data/civicIdeasData';
import { 
  subscribeToCivicIdeas, 
  submitCivicIdea, 
  toggleSecondCivicIdea, 
  getLocalSecondedIdeaIds 
} from '../lib/firebase';
import { WARD_NEIGHBORHOOD_GUIDE } from '../data/neighborhoodData';
import { CivicPrioritiesShareModal } from './CivicPrioritiesShareModal';

interface CivicIdeaBoardProps {
  initialWard?: string;
  initialTheme?: CivicThemeId | 'all';
  isEmbedded?: boolean;
}

export const CivicIdeaBoard: React.FC<CivicIdeaBoardProps> = ({
  initialWard = 'all',
  initialTheme = 'all',
  isEmbedded = false
}) => {
  const [ideas, setIdeas] = useState<CivicIdea[]>([]);
  const [secondedIds, setSecondedIds] = useState<string[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>(initialWard);
  const [selectedTheme, setSelectedTheme] = useState<CivicThemeId | 'all'>(initialTheme);
  const [sortMode, setSortMode] = useState<'supported' | 'newest'>('supported');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Submission Form State
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formWard, setFormWard] = useState<string>(initialWard !== 'all' ? initialWard : 'all');
  const [formTheme, setFormTheme] = useState<CivicThemeId>('housing');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Share Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [sharingIdea, setSharingIdea] = useState<CivicIdea | null>(null);
  const [hasCopiedShareUrl, setHasCopiedShareUrl] = useState<string | null>(null);

  // Subscribe to real-time ideas & load local seconded state
  useEffect(() => {
    setSecondedIds(getLocalSecondedIdeaIds());
    const unsub = subscribeToCivicIdeas((loadedIdeas) => {
      setIdeas(loadedIdeas);
    });
    return () => unsub();
  }, []);

  // Update initial ward if changed
  useEffect(() => {
    if (initialWard && initialWard !== 'all') {
      setSelectedWard(initialWard);
      setFormWard(initialWard);
    }
  }, [initialWard]);

  // Handle +1 Second
  const handleToggleSecond = async (ideaId: string) => {
    // Optimistic UI update
    const isCurrentlySeconded = secondedIds.includes(ideaId);
    const updatedSeconds = isCurrentlySeconded
      ? secondedIds.filter(id => id !== ideaId)
      : [...secondedIds, ideaId];
    
    setSecondedIds(updatedSeconds);
    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          secondsCount: Math.max(0, idea.secondsCount + (isCurrentlySeconded ? -1 : 1))
        };
      }
      return idea;
    }));

    await toggleSecondCivicIdea(ideaId);
  };

  // Handle Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (formTitle.trim().length < 8) {
      setFormError('Please provide a descriptive title (at least 8 characters).');
      return;
    }
    if (formDescription.trim().length < 15) {
      setFormError('Please add a brief explanation of why this priority matters (at least 15 characters).');
      return;
    }

    setIsSubmitting(true);
    const result = await submitCivicIdea({
      title: formTitle,
      description: formDescription,
      ward: formWard,
      theme: formTheme
    });
    setIsSubmitting(false);

    if (result.success) {
      setFormSuccess('Your civic priority has been published live to the community board!');
      setFormTitle('');
      setFormDescription('');
      setTimeout(() => {
        setIsFormOpen(false);
        setFormSuccess(null);
      }, 2500);
    } else {
      setFormError(result.message);
    }
  };

  // Filter and sort ideas
  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => {
      // Ward filter
      if (selectedWard !== 'all') {
        if (idea.ward !== 'all' && idea.ward !== selectedWard) {
          return false;
        }
      }
      // Theme filter
      if (selectedTheme !== 'all' && idea.theme !== selectedTheme) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = idea.title.toLowerCase().includes(query);
        const matchesDesc = idea.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortMode === 'supported') {
        return b.secondsCount - a.secondsCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [ideas, selectedWard, selectedTheme, sortMode, searchQuery]);

  // Total seconds across all proposals
  const totalCivicSeconds = useMemo(() => {
    return ideas.reduce((acc, curr) => acc + curr.secondsCount, 0);
  }, [ideas]);

  const handleCopyShareLink = (ideaId: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/priorities?idea=${ideaId}`;
      navigator.clipboard.writeText(url);
      setHasCopiedShareUrl(ideaId);
      setTimeout(() => setHasCopiedShareUrl(null), 2500);
    }
  };

  const handleOpenShareModal = (idea?: CivicIdea) => {
    setSharingIdea(idea || null);
    setIsShareModalOpen(true);
  };

  const getWardLabel = (wardKey: string) => {
    if (wardKey === 'all' || wardKey === 'at-large') return 'City-Wide';
    const wardNum = parseInt(wardKey, 10);
    const loc = WARD_NEIGHBORHOOD_GUIDE[wardNum];
    return loc ? `Ward ${wardNum} • ${loc.communities.split(',')[0]}` : `Ward ${wardKey}`;
  };

  return (
    <div className={`space-y-6 ${isEmbedded ? 'p-3 sm:p-5 bg-slate-950 text-slate-100 min-h-screen' : ''}`}>
      {/* Header Banner & Call-to-Action */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Citizen Agenda 2026
              </span>
              <span className="text-xs font-mono text-slate-400">
                {ideas.length} Priorities • {totalCivicSeconds.toLocaleString()} Likes
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Community Priorities &amp; Action Board
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Real neighborhood proposals submitted by Greater Sudbury residents and community organizations. Like the priorities you want the 2026–2030 Council to deliver, or put your own proposal on the table.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              type="button"
              id="open-new-priority-form-btn"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer font-mono"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isFormOpen ? 'Close Form' : 'Post a Priority'}</span>
            </button>

            {!isEmbedded && (
              <button
                type="button"
                id="open-share-priorities-modal-btn"
                onClick={() => handleOpenShareModal()}
                className="px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-750 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer font-mono shadow-sm"
                title="Share or embed Priorities Board"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Share</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Citizen Submission Form Drawer */}
      {isFormOpen && (
        <form 
          onSubmit={handleFormSubmit}
          className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Submit an Open Priority to Council
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              {formError}
            </div>
          )}

          {formSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ward Scope Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Geographic Scope / Ward
              </label>
              <select
                value={formWard}
                onChange={(e) => setFormWard(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">City-Wide (All Greater Sudbury)</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                  <option key={num} value={num.toString()}>
                    Ward {num} • {WARD_NEIGHBORHOOD_GUIDE[num]?.name || `Ward ${num}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Civic Theme Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Priority Theme
              </label>
              <select
                value={formTheme}
                onChange={(e) => setFormTheme(e.target.value as CivicThemeId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              >
                {Object.values(CIVIC_THEMES).map(t => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Clear Proposal Headline (Max 120 chars)
              </label>
              <span className={`text-[11px] font-mono ${formTitle.length > 100 ? 'text-amber-400' : 'text-slate-500'}`}>
                {formTitle.length}/120
              </span>
            </div>
            <input
              type="text"
              maxLength={120}
              placeholder="e.g. Add protected bicycle lanes on Lasalle Blvd between Falconbridge and Notre Dame"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-slate-600"
            />
          </div>

          {/* Detailed Justification */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Why does this matter? What specific action should Council take?
              </label>
              <span className={`text-[11px] font-mono ${formDescription.length > 500 ? 'text-amber-400' : 'text-slate-500'}`}>
                {formDescription.length}/600
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={600}
              placeholder="Explain the community benefit, safety impact, or policy change you want candidates to commit to..."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-slate-600 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] font-mono text-slate-400">
              100% Anonymous. Moderated for respect and community standards.
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-mono flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish Priority</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 sm:p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search community priorities (e.g. transit, housing, roads, warming hub)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Controls: Ward, Sort */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Ward Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none font-mono cursor-pointer"
              >
                <option value="all" className="bg-slate-900 text-white">All Wards (City-Wide)</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(w => (
                  <option key={w} value={w.toString()} className="bg-slate-900 text-white">
                    Ward {w} ({WARD_NEIGHBORHOOD_GUIDE[w]?.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => setSortMode('supported')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  sortMode === 'supported' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>
              <button
                type="button"
                onClick={() => setSortMode('newest')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  sortMode === 'newest' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Recent</span>
              </button>
            </div>
          </div>
        </div>

        {/* Theme Filter Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setSelectedTheme('all')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors cursor-pointer ${
              selectedTheme === 'all' 
                ? 'bg-slate-100 text-slate-950 font-bold' 
                : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Themes ({ideas.length})
          </button>

          {Object.values(CIVIC_THEMES).map(t => {
            const count = ideas.filter(i => i.theme === t.id).length;
            const isSelected = selectedTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTheme(t.id)}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSelected
                    ? `${t.badgeBg} ${t.badgeText} ${t.badgeBorder} border font-bold ring-1 ring-emerald-500/40`
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{t.label}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ideas Card Feed */}
      <div className="space-y-3.5">
        {filteredIdeas.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Info className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-base font-bold text-white">No priorities match your active filters</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Be the first to submit a priority proposal for this ward or category using the button above!
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedWard('all');
                setSelectedTheme('all');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredIdeas.map((idea) => {
            const themeConfig = CIVIC_THEMES[idea.theme] || CIVIC_THEMES.community;
            const isSeconded = secondedIds.includes(idea.id);

            return (
              <div
                key={idea.id}
                className={`bg-slate-900/80 border rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:border-slate-700 shadow-md ${
                  isSeconded 
                    ? 'border-emerald-500/40 ring-1 ring-emerald-500/20 bg-slate-900/95' 
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left Content Area */}
                  <div className="space-y-2.5 flex-1">
                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {/* Theme Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${themeConfig.badgeBg} ${themeConfig.badgeText} ${themeConfig.badgeBorder}`}>
                        {themeConfig.label}
                      </span>

                      {/* Ward Badge */}
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-300 bg-slate-950 border border-slate-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {getWardLabel(idea.ward)}
                      </span>

                      {/* Benchmark / Coalition Badge if applicable */}
                      {idea.isBenchmark && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                          Coalition Priority
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {idea.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {idea.description}
                    </p>
                  </div>

                  {/* Right Action: I Second This Button */}
                  <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                    <button
                      type="button"
                      id={`second-btn-${idea.id}`}
                      onClick={() => handleToggleSecond(idea.id)}
                      className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl flex items-center gap-2.5 font-mono text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm ${
                        isSeconded
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-emerald-500/30 scale-[1.02]'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                      }`}
                      title={isSeconded ? 'Click to remove like' : 'Click to like this priority'}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isSeconded ? 'fill-slate-950' : 'text-emerald-400'}`} />
                      <div className="flex items-center gap-1.5">
                        <span>{isSeconded ? 'Liked' : 'Like'}</span>
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${isSeconded ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-emerald-400'}`}>
                          {idea.secondsCount}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenShareModal(idea)}
                      className="text-[11px] font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Share this priority proposal"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Dedicated Civic Priorities Share Modal (with nested Embed option) */}
      <CivicPrioritiesShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSharingIdea(null);
        }}
        selectedWard={selectedWard}
        selectedIdea={sharingIdea}
      />
    </div>
  );
};
