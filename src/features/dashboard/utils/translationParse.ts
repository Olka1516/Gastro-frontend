export const normalizeTranslationLangCode = (code: string): string => (code === 'ua' ? 'uk' : code)

export const parseTranslationsRecord = <T extends object>(
  raw: unknown,
): Partial<Record<string, T>> | undefined => {
  if (raw == null) return undefined

  let parsed: unknown = raw
  if (typeof parsed === 'string') {
    const trimmed = parsed.trim()
    if (!trimmed) return undefined
    try {
      parsed = JSON.parse(trimmed) as unknown
    } catch {
      return undefined
    }
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return undefined
  }

  const out: Partial<Record<string, T>> = {}
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (value == null || typeof value !== 'object' || Array.isArray(value)) continue
    out[normalizeTranslationLangCode(key)] = value as T
  }

  return Object.keys(out).length > 0 ? out : undefined
}
