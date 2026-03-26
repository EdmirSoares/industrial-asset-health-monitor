import { useMemo } from 'react';
import { useThemeStore } from './themeStore';

export const useThemeMode = () => useThemeStore((state) => state.mode);

export const useThemeColors = () => useThemeStore((state) => state.colors);

export const useToggleTheme = () => useThemeStore((state) => state.toggleTheme);

export const useSetTheme = () => useThemeStore((state) => state.setTheme);

export const useStatusColor = (value: number, threshold: number, warningPercent: number = 0.9) => {
  const colors = useThemeColors();

  return useMemo(() => {
    if (value > threshold) return colors.status.error;
    if (value > threshold * warningPercent) return colors.status.warning;
    return colors.status.success;
  }, [value, threshold, warningPercent, colors]);
};

export const useStatusColorByType = (status: 'normal' | 'warning' | 'critical' | 'info') => {
  const colors = useThemeColors();

  return useMemo(() => {
    switch (status) {
      case 'normal':
        return colors.status.success;
      case 'warning':
        return colors.status.warning;
      case 'critical':
        return colors.status.error;
      case 'info':
        return colors.status.info;
      default:
        return colors.neutral.gray500;
    }
  }, [status, colors]);
};

export const useTextColor = () => useThemeStore((state) => state.colors.text);

export const useThemeSpacing = () => useThemeStore((state) => state.spacing);

export const useThemeFontSize = () => useThemeStore((state) => state.fontSize);

export const useThemeBorderRadius = () => useThemeStore((state) => state.borderRadius);

export const useThemeShadows = () => useThemeStore((state) => state.shadows);

