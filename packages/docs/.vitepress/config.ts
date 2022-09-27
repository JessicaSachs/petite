import { defineConfig } from 'vitepress'
import { readPackageJSON } from 'pkg-types'

const libraryPath = '../../package.json'
const packageJson = await readPackageJSON(libraryPath)
const githubLink = (typeof packageJson.repository === 'string'
  ? packageJson.repository
  : packageJson.repository?.url)
  ?? 'https://github.com/JessicaSachs/petite'

// Define your App-level Config
// Read more about this on the official Vitepress docs.
export default async () => defineConfig({
  title: 'Petite Docs',
  description: packageJson.description,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'GitHub', link: githubLink },
    ],
  },
})
