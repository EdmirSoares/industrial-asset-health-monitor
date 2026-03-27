import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTextColor, useThemeMode, useToggleTheme } from '../theme';

interface ThemeToggleProps {
  size?: number;
}

export function ThemeToggle({ size = 24 }: ThemeToggleProps) {
  const mode = useThemeMode();
  const toggleTheme = useToggleTheme();
  const textColors = useTextColor();

  const icon = mode === 'light' ? 'moon' : 'sunny';

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleTheme}
      accessibilityLabel="Alternar tema"
      accessibilityRole="button">
      <Ionicons name={icon} size={size} color={textColors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
