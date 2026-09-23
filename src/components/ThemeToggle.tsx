import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
        isDark
          ? 'bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border-slate-700 shadow-sm'
          : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-sm'
      } ${className}`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 rotate-0 scale-100 transition-all duration-200" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 rotate-0 scale-100 transition-all duration-200" />
        )}
      </div>
      {showLabel && (
        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
