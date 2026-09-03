import React from 'react';
import { ExternalLink, X, Globe, ShieldAlert, ArrowRight } from 'lucide-react';

interface ExternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  category?: string;
  description?: string;
}

export const ExternalLinkModal: React.FC<ExternalLinkModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  category = 'External Resource',
  description = 'You are navigating away from the Greater Sudbury Municipal Elections Historical Archive to an external website.'
}) => {
  if (!isOpen) return null;

  const handleProceed = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <Globe className="w-3.5 h-3.5" />
            <span>{category}</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Navigating to External Site
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Target Destination
          </div>
          <div className="font-semibold text-white text-sm truncate">
            {title}
          </div>
          <div className="text-[11px] text-slate-400 font-mono bg-slate-950/50 p-2 rounded-xl border border-slate-800/80 break-all">
            {url}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-amber-300/90 bg-amber-950/30 border border-amber-500/30 rounded-xl p-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>External content is maintained by the respective organization or candidate campaign.</span>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Continue</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
