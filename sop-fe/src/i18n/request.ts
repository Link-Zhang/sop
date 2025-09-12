import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // const locale = "zh-CN";
  const locale = "en-US";

  return {
    locale,
    messages: (await import(`@/i18n/locales/${locale}.json`)).default,
  };
});
