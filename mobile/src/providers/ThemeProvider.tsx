import { useColorScheme } from 'react-native';
import { createContext, useContext, type ReactNode } from 'react';
import { colors, type ColorScheme } from '@/theme/colors';

type Palette = (typeof colors)[ColorScheme];

type ThemeContextValue = {
  scheme: ColorScheme;
  palette: Palette;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue>({
  scheme: 'light',
  palette: colors.light,
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const scheme: ColorScheme = systemScheme === 'dark' ? 'dark' : 'light';

  return (
    <ThemeContext.Provider
      value={{
        scheme,
        palette: colors[scheme],
        isDark: scheme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
