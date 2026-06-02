const iconModules = import.meta.glob('@/assets/images/icons/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const iconUrlByName = Object.fromEntries(
  Object.entries(iconModules).map(([path, url]) => {
    const name = path.split('/').pop()?.replace(/\.svg$/, '') ?? path
    return [name, url]
  }),
)

export const getImage = (path: string) => {
  const filename = path.split('/').pop()?.replace(/\.svg$/, '') ?? ''
  return iconUrlByName[filename] ?? ''
}
