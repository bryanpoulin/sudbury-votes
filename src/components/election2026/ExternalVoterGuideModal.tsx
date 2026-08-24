import React from 'react';
import { 
  ExternalLink, 
  X, 
  Building2, 
  ShieldCheck, 
  Vote, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';

interface ExternalVoterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OFFICIAL_VOTER_GUIDE_URL = 
  'https://www.greatersudbury.ca/city-hall/municipal-schoolboard-elections/for-voters/';

export const ExternalVoterGuideModal: React.FC<ExternalVoterGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handleProceed = () => {
    window.open(OFFICIAL_VOTER_GUIDE_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      id="external-voter-guide-modal"
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle accent backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Building2 className="w-3.5 h-3.5" /> Official City Website
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            You are navigating outside this analytics archive to the City of Greater Sudbury's official municipal and school board elections website for voters.
          </p>
        </div>

        {/* What You'll Find On The City Site */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            Official Resources Provided on City Portal:
          </div>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Voter Lookup & Registration</strong> (Check if you are on the Voters' List)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Online & Telephone Voting Access</strong> (Electronic voting credentials)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Accepted Identification & Eligibility</strong> (ID requirements to vote)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>In-Person Polling Locations & Transit</strong> (Accessible voting locations)</span>
            </li>
          </ul>
        </div>

        {/* Destination preview */}
        <div className="text-[11px] text-slate-400 font-mono bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 truncate">
          <span className="text-slate-500">Destination: </span>
          <span className="text-emerald-400">{OFFICIAL_VOTER_GUIDE_URL}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            Cancel & Return
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Continue</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
