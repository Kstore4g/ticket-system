import React, { useEffect } from "react";
import { THEME_LIGHT, THEME_DARK, type Theme, applyTheme } from "../lib/theme";

type Props = {
  children: React.ReactNode;
  theme?: "light" | "dark";
  customTheme?: Partial<Theme>;
};

export default function ThemeProvider({ children, theme = "light", customTheme }: Props) {
  useEffect(() => {
    const base = theme === "dark" ? THEME_DARK : THEME_LIGHT;
    const merged: Theme = {
      ...base,
      ...(customTheme as any ?? {}),
      colors: { ...base.colors, ...(customTheme?.colors ?? {}) },
      shadows: { ...base.shadows, ...(customTheme?.shadows ?? {}) },
    };
    applyTheme(merged);
  }, [theme, customTheme]);
  return <>{children}</>;
}
