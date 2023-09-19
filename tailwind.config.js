import plugin from "tailwindcss/plugin";

const rotateX = plugin(({ addUtilities }) => {
  addUtilities({
    ".-rotate-y-180": {
      transform: "rotateY(-180deg)",
    },
    ".-rotate-y-160": {
      transform: "rotateY(-160deg)",
    },
    ".-rotate-y-140": {
      transform: "rotateY(-140deg)",
    },
    ".-rotate-y-120": {
      transform: "rotateY(-120deg)",
    },
    ".-rotate-y-100": {
      transform: "rotateY(-100deg)",
    },
    ".-rotate-y-80": {
      transform: "rotateY(-80deg)",
    },
    ".-rotate-y-60": {
      transform: "rotateY(-60deg)",
    },
    ".-rotate-y-40": {
      transform: "rotateY(-40deg)",
    },
    ".-rotate-y-20": {
      transform: "rotateY(-20deg)",
    },
    ".rotate-y": {
      transform: "rotateY(0deg)",
    },
    ".rotate-y-20": {
      transform: "rotateY(20deg)",
    },
    ".rotate-y-40": {
      transform: "rotateY(40deg)",
    },
    ".rotate-y-60": {
      transform: "rotateY(60deg)",
    },
    ".rotate-y-80": {
      transform: "rotateY(80deg)",
    },
  });
});

const rotateY = plugin(({ addUtilities }) => {
  addUtilities({
    ".-rotate-y-180": {
      transform: "rotateY(-180deg)",
    },
    ".-rotate-y-160": {
      transform: "rotateY(-160deg)",
    },
    ".-rotate-y-140": {
      transform: "rotateY(-140deg)",
    },
    ".-rotate-y-120": {
      transform: "rotateY(-120deg)",
    },
    ".-rotate-y-100": {
      transform: "rotateY(-100deg)",
    },
    ".-rotate-y-80": {
      transform: "rotateY(-80deg)",
    },
    ".-rotate-y-60": {
      transform: "rotateY(-60deg)",
    },
    ".-rotate-y-40": {
      transform: "rotateY(-40deg)",
    },
    ".-rotate-y-20": {
      transform: "rotateY(-20deg)",
    },
    ".rotate-y": {
      transform: "rotateY(0deg)",
    },
    ".rotate-y-20": {
      transform: "rotateY(20deg)",
    },
    ".rotate-y-40": {
      transform: "rotateY(40deg)",
    },
    ".rotate-y-60": {
      transform: "rotateY(60deg)",
    },
    ".rotate-y-80": {
      transform: "rotateY(80deg)",
    },
  });
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [rotateX, rotateY],
};
