export const darkColors = {
  primary: {
    main: '#64B5F6',
    light: '#90CAF9',
    dark: '#42A5F5',
    contrast: '#000000',
  },

  status: {
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#EF5350',
    info: '#29B6F6',
    normal: '#4ADE80',
  },

  background: {
    primary: '#121212',
    secondary: '#1E1E1E',
    dark: '#000000',
    darkCard: '#2C2C2C',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    tertiary: '#888888',
    disabled: '#666666',
    placeholder: '#555555',
    inverse: '#000000',
    inverseFaded: 'rgba(0, 0, 0, 0.8)',
  },

  border: {
    light: '#333333',
    medium: '#444444',
    dark: '#555555',
    divider: '#2C2C2C',
  },

  shadow: {
    base: '#000000',
  },

  feature: {
    scan: {
      accent: '#202020ff',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    ai: {
      primary: '#BA68C8',
      secondary: '#AB47BC',
    },
    telemetry: {
      primary: '#29B6F6',
      vibration: '#42A5F5',
      temperature: '#EF5350',
    },
  },

  neutral: {
    gray50: '#2C2C2C',
    gray100: '#333333',
    gray200: '#3D3D3D',
    gray300: '#4A4A4A',
    gray400: '#5A5A5A',
    gray500: '#6A6A6A',
    gray600: '#8A8A8A',
    gray700: '#9E9E9E',
    gray800: '#BDBDBD',
    gray900: '#E0E0E0',
  },

  pure: {
    white: '#FFFFFF',
    black: '#000000',
  },
} as const;
