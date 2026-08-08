"use client";
import Image from "next/image";
import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const Loader = memo(function Loader() {
  const reduce = useReducedMotion();

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#EEF4FF] via-[#DDE7FA] to-indigo-50 dark:from-[#070B1A] dark:via-[#0F1C3F] dark:to-slate-900" />

      <div className="absolute -z-10 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 dark:opacity-30 bg-[radial-gradient(circle_at_center,rgba(46,90,166,0.35),rgba(79,131,209,0.20),transparent_65%)]" />
      <div className="absolute -z-10 bottom-0 right-0 h-[300px] w-[300px] rounded-full blur-3xl opacity-20 dark:opacity-15 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.30),rgba(79,131,209,0.15),transparent_65%)]" />
      <div className="absolute -z-10 top-0 left-0 h-[250px] w-[250px] rounded-full blur-3xl opacity-15 dark:opacity-10 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.25),rgba(139,92,246,0.15),transparent_65%)]" />

      <motion.section
        initial={reduce ? undefined : { opacity: 0, y: 20, scale: 0.95 }}
        animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "w-full max-w-sm rounded-3xl border",
          "border-[#4F83D1]/20 dark:border-white/10",
          "bg-white/90 dark:bg-slate-950/80 px-6 py-8",
          "flex flex-col items-center justify-center text-center gap-4",
        ].join(" ")}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <motion.div
          initial={reduce ? undefined : { scale: 0.8, opacity: 0 }}
          animate={reduce ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative w-80 h-20 sm:w-96 sm:h-24">
            <Image
              src="/logo.png"
              alt="Diambra Puzzle"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>

          <motion.div
            className="absolute inset-0 -z-20 rounded-full border-2 border-purple-500/10"
            animate={reduce ? undefined : {
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { width: 0, opacity: 0 }}
          animate={reduce ? undefined : { width: "100%", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="h-1 w-32 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"
        />

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="space-y-1"
        >
          <div className="text-[15px] sm:text-[17px] font-black tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
            DIAMBRA PUZZLE
          </div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.35 }}
            className="text-[12px] leading-snug text-slate-600 dark:text-slate-300/85"
          >
            Chargement en cours…
          </motion.div>
        </motion.div>

        <div className="relative grid place-items-center mt-1">
          <motion.div
            className="absolute h-16 w-16 rounded-full opacity-30"
            animate={reduce ? undefined : {
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 blur-xl" />
          </motion.div>

          <motion.div
            className="h-14 w-14 rounded-full border-[3px] border-transparent border-t-purple-600 border-r-indigo-500 dark:border-t-purple-400 dark:border-r-indigo-400"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-4 w-4 rounded-full bg-purple-600 dark:bg-purple-400"
                initial={reduce ? undefined : { opacity: 0.3, scale: 0.8 }}
                animate={reduce ? undefined : {
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                }
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-2"
        >
          <motion.p
            className="text-[14px] text-purple-400 dark:text-purple-400/70 font-medium"
            animate={reduce ? undefined : {
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨ MEMORISER . JOUER . GAGNER
          </motion.p>
        </motion.div>
      </motion.section>
    </div>
  );
});

export default Loader;