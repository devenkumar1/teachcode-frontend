import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
 const env = loadEnv(mode, process.cwd(), '');
 return {
 define: {
// You can define global constants here
'import.meta.env.SOME_KEY': JSON.stringify(env.SOME_KEY)
},
plugins: [react()],
 }
})
