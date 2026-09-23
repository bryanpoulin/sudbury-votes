import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';

interface CivicPrioritiesBannerProps {
  onOpenPriorities: () => void;
  isAlreadyOnPrioritiesTab?: boolean;
}

const BANNER_DISMISS_KEY = 'sudbury_priorities_banner_dismissed_v1';
const BANNER_PREV_THEME_KEY = 'sudbury_priorities_banner_last_theme';

export type BannerTheme = 'hybrid' | 'gold' | 'cobalt';

const AVAILABLE_THEMES: BannerTheme[] = ['hybrid', 'gold', 'cobalt'];

const pickRandomTheme = (): BannerTheme => {
  try {
    const lastTheme = localStorage.getItem(BANNER_PREV_THEME_KEY) as BannerTheme | null;
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
    summaryHighlight: 'text-amber-200 font-semibold',
    button: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:shadow-amber-500/30'
  },
  gold: {
    id: 'gold',
    name: 'City Hall Emerald & Gold',
    badgeDot: 'bg-emerald-400',
    container: 'bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/60 border-y sm:border sm:rounded-2xl border-emerald-500/40 shadow-lg shadow-emerald-950/30 text-white',
    glowLeft: 'bg-emerald-500/15',
    glowRight: 'bg-amber-500/10',
    iconBox: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    iconColor: 'text-emerald-400',
    pulseColor: 'bg-emerald-400',
    pill: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    titleSparkle: 'text-emerald-300',
    summaryHighlight: 'text-emerald-300 font-semibold',
    button: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30'
  },
  cobalt: {
    id: 'cobalt',
    name: 'Civic Blue & Emerald',
    badgeDot: 'bg-sky-400',
    container: 'bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/60 border-y sm:border sm:rounded-2xl border-sky-500/40 shadow-lg shadow-sky-950/20 text-white',
    glowLeft: 'bg-sky-500/15',
    glowRight: 'bg-emerald-500/10',
    iconBox: 'bg-sky-500/15 border-sky-500/40 text-sky-300',
    iconColor: 'text-sky-400',
    pulseColor: 'bg-sky-400',
    pill: 'bg-sky-500/20 border-sky-500/40 text-sky-300',
    titleSparkle: 'text-sky-300',
    summaryHighlight: 'text-sky-200 font-semibold',
    button: 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20 hover:shadow-sky-500/30'
  }
};

export const CivicPrioritiesBanner: React.FC<CivicPrioritiesBannerProps> = ({
  onOpenPriorities,
  isAlreadyOnPrioritiesTab = false
}) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(true);
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

  if (isDismissed || isAlreadyOnPrioritiesTab) {
    return null;
  }

  const active = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.hybrid;

  return (
    <div
      id="top-civic-priorities-ribbon"
      className={`relative z-50 ${active.container} transition-all duration-300`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit">
        <div className={`absolute -left-10 top-0 w-32 h-full ${active.glowLeft} blur-xl transition-colors duration-300`} />
        <div className={`absolute -right-10 top-0 w-32 h-full ${active.glowRight} blur-xl transition-colors duration-300`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`relative shrink-0 flex items-center justify-center w-8 h-8 rounded-xl ${active.iconBox} border transition-colors duration-300`}>
            <Sparkles className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${active.pulseColor} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${active.pulseColor}`} />
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${active.pill} border transition-colors duration-300`}>
                Citizen Agenda
              </span>
              <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Community Priorities &amp; Action Board</span>
                <Sparkles className={`w-3.5 h-3.5 ${active.titleSparkle}`} />
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              Neighborhood priorities across all 12 wards: <span className={active.summaryHighlight}>Housing, Transit, Greenspaces, Roads &amp; Core Services</span>. Like top ideas or put your own on the table.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
          <button
            type="button"
            id="banner-explore-priorities-btn"
            onClick={onOpenPriorities}
            className={`px-4 py-1.5 rounded-xl ${active.button} text-xs font-mono flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer`}
          >
            <span>Explore Priorities</span>
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
