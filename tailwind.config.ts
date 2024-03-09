import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#0c150d",
        bg: "#f3f8f3",
        overlay: "#00000033",
        primary: {
          "100": "#98C398",
          "300": "#7EB47E",
          "500": "#65a565",
          "700": "#538D53",
          "900": "#447444",
          contrast: "#0c150d",
        },
        secondary: {
          "100": "#E5E8F0",
          "300": "#CCD2E1",
          "500": "#a8b2cc",
          "700": "#98A4C3",
          "900": "#7E8EB4",
          contrast: "#0c150d",
        },
      },
      spacing: {
        sm: "theme(fontSize.sm)",
        smPY: "0.375rem",
        smPX: "0.75rem",
        smIcon: "calc(theme(fontSize.sm) * theme(lineHeight.md))",
        md: "theme(fontSize.md)",
        mdPY: "0.5rem",
        mdPX: "1rem",
        mdIcon: "calc(theme(fontSize.base) * theme(lineHeight.md))",
        lg: "theme(fontSize.lg)",
        lgPY: "0.625rem",
        lgPX: "1.25rem",
        lgIcon: "calc(theme(fontSize.lg) * theme(lineHeight.md))",
        xl: "theme(fontSize.xl)",
        "2xl": "theme(fontSize.2xl)",
        "3xl": "theme(fontSize.3xl)",
        headerHeight: "3.5rem",
        footerHeight: "1.5rem",
        mainHeight:
          "calc(100vh - theme(spacing.headerHeight) - theme(spacing.footerHeight))",
      },
      boxShadow: {
        button:
          "2px 2px 4px 0 rgb(0 0 0 / 0.3), inset -2px -2px 4px 0 rgb(0 0 0 / 0.3)",
        active:
          "1px 1px 2px 0 rgb(0 0 0 / 0.3), inset 2px 2px 4px 0 rgb(0 0 0 / 0.3)",
        modal:
          "4px 4px 8px 1px rgb(0 0 0 / 0.3), inset 0 0 12px 0 rgb(0 0 0 / 0.3)",
        error: "0 0 6px 0 #C55959, inset 0 0 6px 0 #C55959",
      },
      transitionProperty: {
        colors:
          "color, background-color, border-color, text-decoration-color, fill, stroke, opacity",
        dropdown: "top, left, bottom, right, transform, opacity",
        activity: "background-color, color, box-shadow",
        disableAutofill: "backgroundColor 600000s 0s, color 600000s 0s",
      },
      animation: {
        ghostAnim: "ghostAnim 1500ms infinite",
        loaderAnim: "loaderAnim 1.4s infinite ease-in-out both",
      },
    },
  },
  plugins: [],
};
export default config;
