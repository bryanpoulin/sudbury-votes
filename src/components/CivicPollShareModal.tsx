import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  MessageSquare, 
  Mail, 
  ExternalLink,
  Sparkles,
  QrCode,
  Vote
} from 'lucide-react';

interface CivicPollShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWard?: string | null;
}

export const CivicPollShareModal: React.FC<CivicPollShareModalProps> = ({
  isOpen,
  onClose,
  selectedWard
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [includeWard, setIncludeWard] = useState<boolean>(Boolean(selectedWard && selectedWard !== 'all'));

  if (!isOpen) return null;

  // Determine share URL with dedicated /poll entry point and optional ward parameter
  const getShareUrl = () => {
    if (typeof window === 'undefined') return 'https://sudburyvotes.info/poll';
    const baseUrl = window.location.origin;
    const url = new URL('/poll', baseUrl);
    if (includeWard && selectedWard && selectedWard !== 'all') {
      url.searchParams.set('ward', selectedWard);
    }
    return url.toString();
  };

  const shareUrl = getShareUrl();
  const shareTitle = '2026 Greater Sudbury Civic Stance Poll';
  const shareText = 'Where do you stand on the Downtown Event Centre, roads, homelessness, and taxes? Cast your anonymous ballot in the 2026 Greater Sudbury Civic Stance Poll:';

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

  // Social sharing direct URLs
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
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Civic Pulse • Community Share</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Share 2026 Civic Stance Poll
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview explanation */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Invite your friends, neighbours, community groups, and fellow Greater Sudbury residents to voice their stance on the 4 major municipal priorities. Every response strengthens our collective civic data.
        </p>

        {/* Copy Link Input Box */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Direct Deep-Link:
          </label>
          <div className="flex items-center gap-2 p-1.5 bg-slate-950/80 border border-slate-700 rounded-2xl">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-3 py-1 text-xs sm:text-sm font-mono text-emerald-300 focus:outline-none select-all truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Optional Ward Deep Link Checkbox */}
        {selectedWard && selectedWard !== 'all' && (
          <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-300 font-mono">
              Include Ward {selectedWard} in link (auto-selects for residents)
            </span>
            <input
              type="checkbox"
              checked={includeWard}
              onChange={(e) => setIncludeWard(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-slate-700 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
        )}

        {/* Visual iMessage & Social Card Preview */}
        <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
            <span>iMessage &amp; Social Card Preview:</span>
            <span className="text-emerald-400 font-normal">sudburyvotes.info/poll</span>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-md">
            <img 
              src="/poll-og-preview.png" 
              alt="2026 Greater Sudbury Civic Stance Poll Preview Card" 
              className="w-full h-auto object-cover max-h-36 border-b border-slate-800"
            />
            <div className="p-3 bg-slate-900/90 space-y-0.5">
              <div className="text-[11px] font-mono text-slate-400">
                sudburyvotes.info/poll
              </div>
              <div className="text-xs font-bold text-white leading-snug">
                2026 Greater Sudbury Civic Stance Poll | Voice Your Stance
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                Where do you stand on the Downtown Event Centre, roads, homelessness, and municipal taxes? Cast your anonymous ballot.
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
            {/* Reddit (r/Sudbury) */}
            <a
              href={redditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:text-orange-200 text-xs font-mono flex flex-col items-center justify-center gap-1 transition-colors text-center"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span className="font-bold">r/Sudbury</span>
            </a>

            {/* Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:text-blue-200 text-xs font-mono flex flex-col items-center justify-center gap-1 transition-colors text-center"
            >
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span className="font-bold">Facebook</span>
            </a>

            {/* Twitter / X */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono flex flex-col items-center justify-center gap-1 transition-colors text-center"
            >
              <span className="text-base font-bold leading-none">𝕏</span>
              <span className="font-bold">Post / X</span>
            </a>

            {/* Email */}
            <a
              href={emailUrl}
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-mono flex flex-col items-center justify-center gap-1 transition-colors text-center"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">Email</span>
            </a>
          </div>

          {/* Native Mobile OS Share Sheet */}
          {hasNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mt-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Open Device Share Menu (Messages, WhatsApp, etc.)</span>
            </button>
          )}
        </div>

        {/* Civic Privacy Callout */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Vote className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Anonymous & Zero-Tracker Ballot</span>
          </div>
          <span className="text-slate-500">sudburyvotes.info</span>
        </div>
      </div>
    </div>
  );
};
