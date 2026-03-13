export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"IBM Plex Sans\"", "sans-serif"]
      },
      colors: {
        ink: {
          900: "#0c0f14",
          700: "#1b2330",
          500: "#313a4a"
        },
        sand: {
          50: "#f7f4ef",
          100: "#ede6da",
          200: "#e0d3bf"
        },
        ember: {
          500: "#ff6b3d",
          600: "#f3521f"
        },
        teal: {
          500: "#18a4a6"
        }
      }
    }
  },
  plugins: []
};
