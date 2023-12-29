import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    plugins: [
        laravel({
            input: `resources/js/${process.env.VITE_APP_TYPE}/index.tsx`,
            refresh: true,
        }),
        react()
    ],
    server: {
        hmr: {
            host: 'localhost'
        }
    }
});
