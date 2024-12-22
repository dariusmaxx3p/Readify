"use client";

import Header from "@blocks/header";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <motion.div className="home-page flex flex-col">
      <Header />
    </motion.div>
  );
}
