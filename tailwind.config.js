/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          green: {
            DEFAULT: "#218225",
            light: "#3BA440",
            lighter: "#E8FFE9",
            drawer: "#E4FFE5"
          },
          yellow: {
            DEFAULT: "#FEC844",
            light: "#FFF0CD",
            lighter: "#FFF5DD",
          },
          gray: {
            DEFAULT: "#2F2F2F",
            light: "#F7F7F7",
            100: "#DDDDDD",
            200: "#C3C3C3",
            300: "#787878",
          },
          inputBg: "#F3F3F3"
        },
        fontFamily: {
          pblackitalics: ["PlayFair-BlackItalics", "sans-serif"],
          rthin: ["Raleway-Thin", "sans-serif"],
          rlight: ["Raleway-Light", "sans-serif"],
          rregular: ["Raleway-Regular", "sans-serif"],
          rmedium: ["Raleway-Medium", "sans-serif"],
          rbold: ["Raleway-Bold", "sans-serif"],
          rblack: ["Raleway-Black", "sans-serif"],
        },
        animation: {
          'spin-fast': 'spin 0.5s linear infinite',
        }
      },
    },
    plugins: [],
  }