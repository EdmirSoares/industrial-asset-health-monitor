import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from './colors';
import { darkColors } from './darkColors';
import { spacing, fontSize, fontWeight, borderRadius, shadows } from './theme';

export type ThemeMode = 'light' | 'dark';

type ColorValue = string;

interface ThemeColors {
  primary: { main: ColorValue; light: ColorValue; dark: ColorValue; contrast: ColorValue };
  status: {
    success: ColorValue;
    warning: ColorValue;
    error: ColorValue;
    info: ColorValue;
    normal: ColorValue;
  };
  background: {
    primary: ColorValue;
    secondary: ColorValue;
    dark: ColorValue;
    darkCard: ColorValue;
    overlay: ColorValue;
  };
  text: {
    primary: ColorValue;
    secondary: ColorValue;
    tertiary: ColorValue;
    disabled: ColorValue;
    placeholder: ColorValue;
    inverse: ColorValue;
    inverseFaded: ColorValue;
  };
  border: { light: ColorValue; medium: ColorValue; dark: ColorValue; divider: ColorValue };
  shadow: { base: ColorValue };
  feature: {
    scan: { accent: ColorValue; overlay: ColorValue };
    ai: { primary: ColorValue; secondary: ColorValue };
    telemetry: { primary: ColorValue; vibration: ColorValue; temperature: ColorValue };
  };
  neutral: { [key: string]: ColorValue };
  pure: { white: ColorValue; black: ColorValue };
}

interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: typeof spacing;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
}

interface ThemeActions {
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

type ThemeStore = ThemeState & ThemeActions;

const getThemeColors = (mode: ThemeMode): ThemeColors => {
  return (mode === 'dark' ? darkColors : colors) as unknown as ThemeColors;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: 'light',
      colors: colors,
      spacing,
      fontSize,
      fontWeight,
      borderRadius,
      shadows,

      toggleTheme: () => {
        const newMode = get().mode === 'light' ? 'dark' : 'light';
        set({
          mode: newMode,
          colors: getThemeColors(newMode),
        });
      },

      setTheme: (mode: ThemeMode) => {
        set({
          mode,
          colors: getThemeColors(mode),
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.colors = getThemeColors(state.mode);
        }
      },
    }
  )
);
