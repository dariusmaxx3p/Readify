"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/contexts/app-context";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { AnimatePresence } from "motion/react";

export function ChangeLocale() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  const { state } = useAppContext();
  const {
    features: { allowChangeLocale },
  } = state;

  const MotionButton = motion(Button);

  return (
    allowChangeLocale && (
      <AnimatePresence>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MotionButton
              variant="outline"
              size="icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-base">{locale}</span>
              <span className="sr-only">Change locale</span>
            </MotionButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLocale("vi")}>
              vi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLocale("en")}>
              en
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </AnimatePresence>
    )
  );
}
