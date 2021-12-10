const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "9/16": "56.25%",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans", ...defaultTheme.fontFamily.sans],
        serif: [
          '"Playfair Display"',
          "ui-serif",
          ...defaultTheme.fontFamily.serif,
        ],
      },
      boxShadow: {
        button: "4px 4px 0px #D34A65",
        buttonLight: "6px 6px 0px #F4B3BB",
        tag: "3px 3px 0px #D34A65",
      },
      colors: {
        pink: {
          DEFAULT: "#D34A65",
          light: "#F78FB3",
        },
        yellow: {
          DEFAULT: "#F5cd7a",
          light: "#F7D794",
        },
        blue: {
          DEFAULT: "#556EE6",
          light: "#778BEB",
        },
        black: "#303A52",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            backgroundColor: theme("colors.white"),
            color: theme("colors.black"),
            a: {
              textDecoration: false,
              color: theme("colors.primary"),
              "&:hover": {
                color: theme("colors.yellow"),
              },
              code: { color: theme("colors.primary") },
            },
            h1: {
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.black"),
              fontFamily: "serif",
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.black"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.black"),
            },
            "h4,h5,h6": {
              color: theme("colors.black"),
            },
            code: {
              color: theme("colors.pink"),
              backgroundColor: theme("colors.pink"),
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: "0.25rem",
            },
            "code:before": {
              content: "none",
            },
            "code:after": {
              content: "none",
            },
            details: {
              backgroundColor: theme("colors.black"),
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: "0.25rem",
            },
            hr: { borderColor: theme("colors.black") },
            "ol li:before": {
              fontWeight: "600",
              color: theme("colors.black"),
            },
            "ul li:before": {
              backgroundColor: theme("colors.black"),
            },
            strong: { color: theme("colors.black0") },
            blockquote: {
              color: theme("colors.pink"),
              borderLeftColor: theme("colors.pink"),
              fontStyle: false,
              textDecoration: false,
            },
          },
        },
        dark: {
          css: {
            backgroundColor: theme("colors.black"),

            color: theme("colors.white"),
            a: {
              color: theme("colors.pink"),
              "&:hover": {
                color: theme("colors.yellow"),
              },
              code: { color: theme("colors.pink") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.white"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.white"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.white"),
            },
            "h4,h5,h6": {
              color: theme("colors.white"),
            },
            code: {
              backgroundColor: theme("colors.white"),
            },
            details: {
              backgroundColor: theme("colors.white"),
            },
            hr: { borderColor: theme("colors.white") },
            "ol li:before": {
              fontWeight: "600",
              color: theme("colors.white"),
            },
            "ul li:before": {
              backgroundColor: theme("colors.black"),
            },
            strong: { color: theme("colors.white") },
            thead: {
              color: theme("colors.white"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.white"),
              },
            },
            blockquote: {
              fontStyle: false,
              color: theme("colors.pink"),
              borderLeftColor: theme("colors.pink"),
              textDecoration: false,
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark", "dark-hover"],
    fill: ["hover", "focus", "dark"],
  },
  plugins: [],
};
