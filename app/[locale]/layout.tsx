import { I18nProviderClient } from "@/locales/client";
import { use } from "react";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactElement;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
