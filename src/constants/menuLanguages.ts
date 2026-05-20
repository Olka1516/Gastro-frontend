export interface MenuLanguage {
  code: string
  label: string
  nativeLabel: string
  flag: string
}

export const MENU_LANGUAGES: MenuLanguage[] = [
  { code: 'uk', label: 'Ukrainian', nativeLabel: 'Українська', flag: '🇺🇦' },
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'pl', label: 'Polish', nativeLabel: 'Polski', flag: '🇵🇱' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano', flag: '🇮🇹' },
  { code: 'cs', label: 'Czech', nativeLabel: 'Čeština', flag: '🇨🇿' },
  { code: 'ro', label: 'Romanian', nativeLabel: 'Română', flag: '🇷🇴' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', flag: '🇹🇷' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', flag: '🇵🇹' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文', flag: '🇨🇳' },
]

export const DEFAULT_MENU_LANGUAGE = MENU_LANGUAGES[0].code

export const MENU_LANGUAGE_CODES = MENU_LANGUAGES.map((l) => l.code)

export const getMenuLanguage = (code: string) => MENU_LANGUAGES.find((l) => l.code === code)
