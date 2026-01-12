// Source - https://stackoverflow.com/a
// Posted by rozsazoltan, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-11, License - CC BY-SA 4.0

import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // import here

export default {
  plugins: [
    tailwindcss(), // use here
    react(),
    electron({
      main: {
        entry: 'electron/main.ts'
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts')
      },
      renderer: process.env.NODE_ENV === 'test' ? undefined : {}
    })
  ]
}
