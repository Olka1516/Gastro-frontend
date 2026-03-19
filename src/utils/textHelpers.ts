export function spaceToUnderscore(text: string): string {
  return text.trim().replace(/\s+/g, '_')
}

export function underscoreToSpace(text: string): string {
  return text.trim().replace(/_+/g, ' ')
}
