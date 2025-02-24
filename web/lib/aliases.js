import { bin } from '@abw/badger-filesystem'

// Hack to get vite.docs.js to resolve path aliases in tsconfig because
// vite-tsconfig-paths doesn't seem to work (probably because of web directory?)

export const resolveAliases = async () => {
  const root = bin(import.meta.url).up(2)
  const tsconfig = await root.file('tsconfig.json', { codec: 'json' }).read()
  const paths = tsconfig.compilerOptions.paths
  const alias = Object.entries(paths).reduce(
    (aliases, [alias, paths]) => {
      aliases[alias.replace(/\/\*$/, '')] = root.path(paths[0].replace(/\/\*$/, ''))
      return aliases
    },
    { }
  )
  return { alias }
}