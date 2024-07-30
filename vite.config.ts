import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt'],
            devOptions: {
                enabled: true
            },
            manifest: {
                name: 'Zeals',
                icons: [
                    {
                        src: '/icons/android-icon-36x36.png',
                        sizes: '36x36',
                        type: 'image/png'
                    },
                    {
                        src: '/icons/android-icon-48x48.png',
                        sizes: '48x48',
                        type: 'image/png'
                    },
                    {
                        src: '/icons/android-icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png'
                    },
                    {
                        src: '/icons/android-icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png'
                    },
                    {
                        src: '/icons/android-icon-144x144.png',
                        sizes: '144x144',
                        type: 'image/png'
                    },
                    {
                        src: '/icons/android-icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
