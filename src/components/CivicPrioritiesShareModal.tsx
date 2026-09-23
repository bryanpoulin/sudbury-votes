import React, { useState, useMemo } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  MessageSquare, 
  Mail, 
  ExternalLink,
  Sparkles,
  Code2
} from 'lucide-react';
import { CivicIdea } from '../types/civicIdeas';
import { CIVIC_THEMES } from '../data/civicIdeasData';
import { WARD_NEIGHBORHOOD_GUIDE } from '../data/neighborhoodData';

interface CivicPrioritiesShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWard?: string | null;
  selectedIdea?: CivicIdea | null;
}

export const CivicPrioritiesShareModal: React.FC<CivicPrioritiesShareModalProps> = ({
  isOpen,
  onClose,
  selectedWard,
  selectedIdea
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [includeWard, setIncludeWard] = useState<boolean>(Boolean(selectedWard && selectedWard !== 'all'));

  // Embed State
  const [showEmbed, setShowEmbed] = useState<boolean>(false);
  const [embedWard, setEmbedWard] = useState<string>(selectedWard && selectedWard !== 'all' ? selectedWard : 'all');
  const [embedTheme, setEmbedTheme] = useState<string>('all');
  const [hasCopiedEmbed, setHasCopiedEmbed] = useState<boolean>(false);

  // Generate Embed code
  const generatedEmbedCode = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sudburyvotes.info';
    const params = new URLSearchParams();
    if (embedWard !== 'all') params.set('ward', embedWard);
    if (embedTheme !== 'all') params.set('theme', embedTheme);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const embedUrl = `${baseUrl}/embed/feed${queryString}`;

    return `<iframe \n  src="${embedUrl}" \n  width="100%" \n  height="750" \n  frameborder="0" \n  style="border: 1px solid #334155; border-radius: 16px; max-width: 820px; width: 100%; margin: 0 auto; display: block;" \n  title="Greater Sudbury 2026 Live Civic Priority Board" \n  loading="lazy">\n</iframe>`;
  }, [embedWard, embedTheme]);

  const handleCopyEmbed = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generatedEmbedCode);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = generatedEmbedCode;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setHasCopiedEmbed(true);
      setTimeout(() => setHasCopiedEmbed(false), 2500);
    } catch {}
  };

  if (!isOpen) return null;

  // Build the dedicated /priorities share URL
  const getShareUrl = () => {
    if (typeof window === 'undefined') return 'https://sudburyvotes.info/priorities';
    const baseUrl = window.location.origin;
    const url = new URL('/priorities', baseUrl);
    if (selectedIdea) {
      url.searchParams.set('idea', selectedIdea.id);
    } else if (includeWard && selectedWard && selectedWard !== 'all') {
      url.searchParams.set('ward', selectedWard);
    }
    return url.toString();
  };

  const shareUrl = getShareUrl();
  const shareTitle = selectedIdea 
    ? `Community Priority: "${selectedIdea.title}" | Sudbury Votes`
    : 'Greater Sudbury Community Priorities & Action Board | Sudbury Votes';
  const shareText = selectedIdea
    ? `Voice your support for this Greater Sudbury community proposal: "${selectedIdea.title}". Browse all citizen priorities across 12 wards:`
    : 'Explore crowdsourced community priorities across all 12 wards in Greater Sudbury. Second top proposals or submit your own:';

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  const encodedTitle = encodeURIComponent(shareTitle);

  const redditUrl = `https://www.reddit.com/r/Sudbury/submit?title=${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`;

  const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-emerald-500/40 rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Community Priorities • Social Share</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Share Priorities Board
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Idea / Ward Note */}
        {selectedIdea ? (
          <div className="bg-slate-950/70 border border-emerald-500/20 rounded-2xl p-3 space-y-1">
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Sharing Specific Priority:</div>
            <div className="text-xs font-bold text-white line-clamp-2">{selectedIdea.title}</div>
          </div>
        ) : (
          <p className="text-xs text-slate-300 leading-relaxed">
            Invite neighbors, community associations, and voters to like top proposals or put their priorities on the board.
          </p>
        )}

        {/* Share Link Input Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Direct Shareable URL:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 select-all focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual iMessage & Social Card Preview */}
        <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
            <span>iMessage &amp; Social Card Preview:</span>
            <span className="text-emerald-400 font-normal">sudburyvotes.info/priorities</span>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-950 overflow-hidden shadow-md">
            <img 
              src="/priorities-og-preview.png" 
              alt="Greater Sudbury Community Priorities & Action Board Social Card" 
              className="w-full h-auto object-cover max-h-36 border-b border-slate-800"
            />
            <div className="p-3 bg-slate-900/90 space-y-0.5">
              <div className="text-[11px] font-mono text-slate-400">
                sudburyvotes.info/priorities
              </div>
              <div className="text-xs font-bold text-white leading-snug">
                Greater Sudbury Community Priorities &amp; Action Board
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                Where should Council take action? Browse neighborhood priorities across all 12 wards and second top community proposals.
              </div>
            </div>
          </div>
        </div>

        {/* Quick Social & Community Channels */}
        <div className="space-y-2.5 pt-1 border-t border-slate-800/80">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Post Directly to Community Channels:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <a
              href={redditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:text-orange-200 text-xs font-mono flex flex-col items-center justify-center gap-1 transition-colors text-center"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span className="font-bold">r/Sudbury</span>
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:text-blue-200 text-xs font-mono flex flex-col items-center justify-center gap-1 transition-colors text-center"
            >
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span className="font-bold">Facebook</span>
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 hover:text-sky-200 text-xs font-mono flex flex-col items-center justify-center gap-1 transition-colors text-center"
            >
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span className="font-bold">X</span>
            </a>

            <a
              href={emailUrl}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex flex-col items-center justify-center gap-1 transition-colors text-center"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span className="font-bold">Email</span>
            </a>
          </div>

          {hasNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>Open Device Share Menu</span>
            </button>
          )}

          {/* Embed Option */}
          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <button
              type="button"
              id="share-modal-embed-btn"
              onClick={() => setShowEmbed(!showEmbed)}
              className={`w-full py-2.5 px-4 rounded-xl border text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                showEmbed 
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                  : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Embed</span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal">
                {showEmbed ? 'Hide Options ▲' : 'Get HTML Code ▼'}
              </span>
            </button>

            {showEmbed && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-150">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Embed this interactive priority feed directly into any web page. Visitors can browse, second, and submit proposals directly.
                </p>

                {/* Customization Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Pre-filter Ward:</label>
                    <select
                      value={embedWard}
                      onChange={(e) => setEmbedWard(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="all">All Wards (City-Wide)</option>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(w => (
                        <option key={w} value={w.toString()}>Ward {w} ({WARD_NEIGHBORHOOD_GUIDE[w]?.name})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Pre-filter Theme:</label>
                    <select
                      value={embedTheme}
                      onChange={(e) => setEmbedTheme(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="all">All Themes</option>
                      {Object.values(CIVIC_THEMES).map(t => (
                        <option key={t.id} value={t.id}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Embed Snippet */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>HTML Embed Code:</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 text-[11px] font-mono overflow-x-auto selection:bg-emerald-500 selection:text-slate-950 leading-relaxed max-h-28">
                    {generatedEmbedCode}
                  </pre>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-400">
                    Responsive iframe (auto-resizes on mobile)
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmbed}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm shrink-0"
                  >
                    {hasCopiedEmbed ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
