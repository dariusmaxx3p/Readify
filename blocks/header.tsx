"use client";

import Logo from "@components/logo";
import { motion } from "motion/react";
import Navbar from "./navbar";
import { ChangeMode } from "./change-mode";
import { ChangeLocale } from "./change-locale";

export default function Header() {
  return (
    <motion.div layout className="flex flex-row items-center px-8 py-4">
      <motion.div className="flex flex-row items-center">
        <Logo />
        <Navbar className="ml-4 font-sans" />
      </motion.div>
      <motion.div className="flex flex-row items-center ml-auto">
        <ChangeLocale />
        <ChangeMode />
      </motion.div>
    </motion.div>
  );
}
