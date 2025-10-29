/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: [ "Outfit", 'sans-serif'], // add your custom font here
            },
        },
    },
    plugins: [],
}