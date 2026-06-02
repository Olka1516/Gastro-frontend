const modules = import.meta.glob('../assets/images/landing/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const landingImageByFilename = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const filename = path.split('/').pop() ?? path
    return [filename, url]
  }),
) as Record<string, string>

export function getLandingImageUrl(filename: string): string {
  return landingImageByFilename[filename] ?? ''
}
