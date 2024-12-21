import { getCurrentLocale } from "@/locales/server";
import { DEFAULT_METADATA_EN, DEFAULT_METADATA_VI } from "@/misc/default";
import Logo from "@components/logo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = await getCurrentLocale();
  if (currentLocale === "vi") {
    return DEFAULT_METADATA_VI;
  }
  return DEFAULT_METADATA_EN;
}

export default function Home() {
  return (
    <div>
      <Logo />
    </div>
  );
}
