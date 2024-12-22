/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Page = {
  key: string;
  href: string;
};

export default function Navbar({ className }: { className?: string }) {
  const pageUrl = `/api/pages`;
  const [pages, setPages] = useState<Page[]>([]);
  const pagesT = useScopedI18n("pages");
  const [hoverPage, setHoverPage] = useState<string>("");
  const currentLocale = useCurrentLocale();

  useEffect(() => {
    fetch(pageUrl)
      .then((res) => res.json())
      .then((data) => {
        setPages(data.pages);
      });
  }, []);

  const onPageMouseEnter = (page: string) => {
    setHoverPage(page);
  };

  const onAllPagesMouseLeave = () => {
    setHoverPage("");
  };

  return (
    <motion.div
      className={`flex flex-row items-center ${className ?? ""}`}
      layout
      onMouseLeave={onAllPagesMouseLeave}
    >
      <AnimatePresence>
        {pages.map((page) => (
          <Link
            key={page.key}
            href={`/${currentLocale}${page.href}`}
            className="relative"
          >
            <motion.span
              key={page.key}
              className={`px-4 py-2 font-serif text-base cursor-pointer relative`}
              layoutId={page.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, type: "spring" }}
              onMouseEnter={() => onPageMouseEnter(page.key)}
            >
              {pagesT(page.key as any)}
            </motion.span>
            {hoverPage === page.key && (
              <motion.div
                className="absolute top-0 left-[12px] -z-10 w-[12px] h-[12px] bg-green-400 rounded-full"
                layoutId="selected-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              ></motion.div>
            )}
          </Link>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
