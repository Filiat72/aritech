import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(
  async ({ requestLocale }) => {
    let locale = await requestLocale

    // Fallback
   if (
  !locale ||
  !['en', 'ta', 'hi', 'ml', 'kn'].includes(locale)
) {
  locale = 'en'
}

    return {
      locale,

      messages: (
        await import(
          `../../messages/${locale}.json`
        )
      ).default,
    }
  }
)