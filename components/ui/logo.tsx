"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Logo() {
  const [isInit, setIsInit] = useState(true);
  const R = "R";
  const e = "e";
  const a = "a";
  const d = "d";
  const i = "i";
  const f = "f";
  const y = "y";
  const dot = ".";

  const fullName = [R, e, a, d, i, f, y, dot];
  return (
    <Link href={"/"}>
      <motion.h1
        className="font-logo text-2xl font-bold text-foreground flex flex-row items-center justify-start"
        onMouseLeave={() => setIsInit(false)}
        layout
      >
        <motion.div className="flex flex-row items-center justify-start">
          <AnimatePresence>
            {fullName.map((letter, index) => {
              switch (letter) {
                case "R":
                  return (
                    <motion.div
                      key={index}
                      className="text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      layoutId="logo-R"
                    >
                      {letter}
                    </motion.div>
                  );
                case "e":
                  if (isInit) {
                    return (
                      <motion.div
                        key={index}
                        className="text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        layoutId="logo-e"
                      >
                        {letter}
                      </motion.div>
                    );
                  }
                  break;
                case "a":
                  if (isInit) {
                    return (
                      <motion.div
                        key={index}
                        className="text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        layoutId="logo-a"
                      >
                        {letter}
                      </motion.div>
                    );
                  }
                  break;
                case "d":
                  return (
                    <motion.div
                      key={index}
                      className="text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      layoutId="logo-d"
                    >
                      {letter}
                    </motion.div>
                  );
                case "i":
                  if (isInit) {
                    return (
                      <motion.div
                        key={index}
                        className="text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        layoutId="logo-i"
                      >
                        {letter}
                      </motion.div>
                    );
                  }
                  break;
                case "f":
                  return (
                    <motion.div
                      key={index}
                      className="text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      layoutId="logo-f"
                    >
                      {letter}
                    </motion.div>
                  );
                case "y":
                  if (isInit) {
                    return (
                      <motion.div
                        key={index}
                        className="text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        layoutId="logo-y"
                      >
                        {letter}
                      </motion.div>
                    );
                  }
                  break;
                case ".":
                  return (
                    <motion.div
                      key={index}
                      className="text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      layoutId="logo-dot"
                    >
                      {letter}
                    </motion.div>
                  );
                default:
                  break;
              }
            })}
          </AnimatePresence>
        </motion.div>
      </motion.h1>
    </Link>
  );
}
