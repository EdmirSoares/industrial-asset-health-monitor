export const colors = {
  primary: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
    contrast: '#FFFFFF',
  },

  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#00E5FF',
    normal: '#4ADE80',
  },

  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    dark: '#121212',
    darkCard: '#1E1E1E',
    overlay: 'rgba(0, 0, 0, 0.3)',
  },

  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#888888',
    disabled: '#999999',
    placeholder: '#CCCCCC',
    inverse: '#FFFFFF',
    inverseFaded: 'rgba(255, 255, 255, 0.8)',
  },

  border: {
    light: '#E0E0E0',
    medium: '#CCCCCC',
    dark: '#333333',
    divider: '#F0F0F0',
  },

  shadow: {
    base: '#000000',
  },

  feature: {
    scan: {
      accent: '#bcbcbc8e',
      overlay: 'rgba(0, 0, 0, 0.3)',
    },
    ai: {
      primary: '#A855F7',
      secondary: '#9C27B0',
    },
    telemetry: {
      primary: '#00E5FF',
      vibration: '#2196F3',
      temperature: '#F44336',
    },
  },

  neutral: {
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
  },

  pure: {
    white: '#FFFFFF',
    black: '#000000',
  },
} as const;

export type ColorPath = keyof typeof colors;
export type StatusColor = keyof typeof colors.status;
export type BackgroundColor = keyof typeof colors.background;
export type TextColor = keyof typeof colors.text;
