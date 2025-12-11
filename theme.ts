export default {
  theme: {
    extend: {
      colors: {
        cccp: {
          primary: "#591C27",
          primaryDark: "#401017",
          accent: "#8B2E3A",
          text: "#1F1F1F",
          border: "#E4E4E4",
          background: "#FFFFFF",
          botBubble: "#F9F9F9",
          userBubble: "#8B2E3A",
          shadow: "rgba(0,0,0,0.15)",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "Roboto", "sans-serif"],
        heading: ["Montserrat", "Helvetica Neue", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        semibold: "600",
        bold: "700",
      },
      boxShadow: {
        cccp: "0 8px 24px rgba(0,0,0,0.15)",
        cccpHover: "0 12px 32px rgba(0,0,0,0.15)",
        cccpMessage: "0 2px 8px rgba(0,0,0,0.15)",
        cccpBox: "0 20px 48px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        cccp: "12px",
        cccpLarge: "16px",
        cccpButton: "9999px",
      },
      spacing: {
        cccp: "16px",
        cccpSmall: "12px",
        cccpLarge: "20px",
      },
    },
  },
};
