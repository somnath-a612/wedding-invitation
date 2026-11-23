import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { sindoor:"#B3201F", maroon:"#2B0A10", wine:"#4A1119", gold:"#D4A64A", ivory:"#FBF3E4", marigold:"#F29A1F" },
    fontFamily: { bangla:["var(--f-bangla)","serif"], serif:["var(--f-serif)","serif"] },
    keyframes: {
      fall:{ "0%":{transform:"translate3d(0,-10vh,0) rotate(0)"}, "100%":{transform:"translate3d(var(--dx),110vh,0) rotate(540deg)"} },
      shimmer:{ "0%":{backgroundPosition:"0% 50%"}, "100%":{backgroundPosition:"200% 50%"} },
    },
    animation: { fall:"fall var(--d) linear infinite", shimmer:"shimmer 6s linear infinite" },
  }},
  plugins: [],
} satisfies Config;
