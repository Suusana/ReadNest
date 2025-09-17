import daisyui from 'daisyui';


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  }, zIndex: {
    'modal': '0',  // 设置 modal 层级为 10

  },
  plugins: [daisyui],
}

