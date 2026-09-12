import React, { useState, useEffect } from 'react';
import { Vote, ArrowRight, X, Sparkles } from 'lucide-react';

interface CivicPollBannerProps {
  onOpenPoll: () => void;
  isAlreadyOnPollTab?: boolean;
}

const BANNER_DISMISS_KEY = 'sudbury_poll_banner_dismissed_wave1';
const BANNER_PREV_THEME_KEY = 'sudbury_poll_banner_last_theme';

export type BannerTheme = 'hybrid' | 'gold' | 'cobalt' | 'dual';

// The 4 distinct high-contrast themes available for randomized selection on each visit/refresh
const AVAILABLE_THEMES: BannerTheme[] = ['hybrid', 'gold', 'cobalt', 'dual'];

// Function to select a random theme on page load that is different from the previous one
const pickRandomTheme = (): BannerTheme => {
  try {
    const lastTheme = localStorage.getItem(BANNER_PREV_THEME_KEY) as BannerTheme | null;
    // Filter out the last seen theme so it always changes upon refresh
    const candidates = AVAILABLE_THEMES.filter(t => t !== lastTheme);
    const pool = candidates.length > 0 ? candidates : AVAILABLE_THEMES;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    localStorage.setItem(BANNER_PREV_THEME_KEY, selected);
    return selected;
  } catch {
    return AVAILABLE_THEMES[Math.floor(Math.random() * AVAILABLE_THEMES.length)];
  }
};

interface ThemeConfig {
  id: BannerTheme;
  name: string;
  badgeDot: string;
  container: string;
  glowLeft: string;
  glowRight: string;
  iconBox: string;
  iconColor: string;
  pulseColor: string;
  pill: string;
  titleSparkle: string;
  summaryHighlight: string;
  button: string;
}

const THEME_CONFIGS: Record<BannerTheme, ThemeConfig> = {
  hybrid: {
    id: 'hybrid',
    name: 'Combined Hybrid',
    badgeDot: 'bg-amber-400',
    container: 'bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border-y sm:border sm:rounded-2xl border-amber-500/50 shadow-lg shadow-amber-950/20 text-white',
    glowLeft: 'bg-amber-500/10',
    glowRight: 'bg-sky-500/10',
    iconBox: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
    iconColor: 'text-amber-400',
    pulseColor: 'bg-amber-400',
    pill: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    titleSparkle: 'text-amber-300',
    summaryHighlight: 'text-amber-300 font-medium',
    button: 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/25',
  },
  gold: {
    id: 'gold',
    name: 'Civic Gold & Amber',
    badgeDot: 'bg-amber-400',
    container: 'bg-gradient-to-r from-stone-950 via-slate-900 to-amber-950/40 border-y sm:border sm:rounded-2xl border-amber-500/50 shadow-lg shadow-amber-950/30 text-white',
    glowLeft: 'bg-amber-500/15',
    glowRight: 'bg-amber-600/15',
    iconBox: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    iconColor: 'text-amber-400',
    pulseColor: 'bg-amber-400',
    pill: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    titleSparkle: 'text-amber-300',
    summaryHighlight: 'text-amber-300 font-medium',
    button: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md shadow-amber-400/25',
  },
  cobalt: {
    id: 'cobalt',
    name: 'Northern Cobalt / Cyan',
    badgeDot: 'bg-sky-400',
    container: 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-y sm:border sm:rounded-2xl border-sky-500/40 shadow-lg shadow-blue-950/40 text-white',
    glowLeft: 'bg-sky-500/15',
    glowRight: 'bg-indigo-500/15',
    iconBox: 'bg-sky-500/20 border-sky-500/40 text-sky-300',
    iconColor: 'text-sky-400',
    pulseColor: 'bg-sky-400',
    pill: 'bg-sky-500/20 border-sky-500/40 text-sky-300',
    titleSparkle: 'text-sky-300',
    summaryHighlight: 'text-sky-300 font-medium',
    button: 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold shadow-md shadow-sky-400/25',
  },
  dual: {
    id: 'dual',
    name: 'Dual-Tone Emerald & Gold',
    badgeDot: 'bg-amber-400',
    container: 'bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-y sm:border sm:rounded-2xl border-amber-500/40 shadow-lg shadow-emerald-950/40 text-white',
    glowLeft: 'bg-emerald-500/15',
    glowRight: 'bg-amber-500/10',
    iconBox: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
    iconColor: 'text-emerald-400',
    pulseColor: 'bg-amber-400',
    pill: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    titleSparkle: 'text-amber-300',
    summaryHighlight: 'text-emerald-300 font-medium',
    button: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md shadow-amber-400/25',
  }
};

export const CivicPollBanner: React.FC<CivicPollBannerProps> = ({
  onOpenPoll,
  isAlreadyOnPollTab = false
}) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(true);
  // Pick a fresh random theme on mount (different from the last visited one)
  const [currentTheme] = useState<BannerTheme>(() => pickRandomTheme());

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(BANNER_DISMISS_KEY);
      if (!dismissed) {
        setIsDismissed(false);
      }
    } catch {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    try {
      localStorage.setItem(BANNER_DISMISS_KEY, 'true');
    } catch {}
  };

  // If user dismissed it or is already actively in the polls view, hide the banner
  if (isDismissed || isAlreadyOnPollTab) {
    return null;
  }

  const active = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.hybrid;

  return (
    <div
      id="top-civic-poll-ribbon"
      className={`relative z-50 ${active.container} transition-all duration-300`}
    >
      {/* Subtle ambient accent glow (clipped to container shape) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit">
        <div className={`absolute -left-10 top-0 w-32 h-full ${active.glowLeft} blur-xl transition-colors duration-300`} />
        <div className={`absolute -right-10 top-0 w-32 h-full ${active.glowRight} blur-xl transition-colors duration-300`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          {/* Pulsing Icon Badge */}
          <div className={`relative shrink-0 flex items-center justify-center w-8 h-8 rounded-xl ${active.iconBox} border transition-colors duration-300`}>
            <Vote className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${active.pulseColor} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${active.pulseColor}`} />
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${active.pill} border transition-colors duration-300`}>
                Wave 1 Open
              </span>
              <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>2026 Greater Sudbury Civic Stance Poll</span>
                <Sparkles className={`w-3.5 h-3.5 ${active.titleSparkle}`} />
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              Cast your ballot on 4 key council decisions: <span className={active.summaryHighlight}>Events Centre, Roads, Homelessness & Taxes</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
          <button
            type="button"
            id="banner-vote-now-btn"
            onClick={onOpenPoll}
            className={`px-4 py-1.5 rounded-xl ${active.button} text-xs font-mono flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer`}
          >
            <span>Cast Ballot Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            id="banner-dismiss-btn"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            title="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

