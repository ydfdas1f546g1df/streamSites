/** @type {import('tailwindcss').Config} */
export default {
    content: ["index.html", './src/**/*.{tsx, ts, js}', "./src/data/**/*.json"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
            "colors": {
                "darkgray": {
                    900: "#09090b",
                    800: "#18181b",
                    700: "#27272a",
                    600: "#36363a",
                    500: "#45454a",
                    400: "#54545b",
                    300: "#636360",
                    200: "#72727b",
                    100: "#818185",
                    50: "#96969e",
                    0: "#fdfdfd",
                },
            },
        },
    },
    plugins: [],
}

