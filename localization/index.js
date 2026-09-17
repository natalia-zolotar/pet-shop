import en from './data/en'
import ua from './data/ua'
import pl from './data/pl'

const translations = { en, ua, pl }
export const locales = Object.keys(translations)
const defaultLocale = locales[0]

export const useLocalization = () => {
  const locale = useCookie('locale', {
    default: () => defaultLocale
  })

  const t = useState('localization-t', () => translations[locale.value])

  const setLocale = (lang) => {
    locale.value = lang
    t.value = translations[lang]
  }

  return {
    locale,
    t,
    setLocale
  }
}