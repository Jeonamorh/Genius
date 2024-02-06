"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-white font-bold py-36 text-center space-y-5"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <motion.h1 variants={item}>The Best AI Tool for</motion.h1>
        <motion.div
          variants={item}
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Blog Writing.",
                "Mail Writing.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </motion.div>
      </div>
      <motion.div
        variants={item}
        className="text-sm md:text-xl font-light text-zinc-400"
      >
        Create content using AI 10x faster.
      </motion.div>
      <motion.div variants={item}>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating For Free
          </Button>
        </Link>
      </motion.div>
      <motion.div
        variants={item}
        className="text-zinc-400 text-xs md:text-sm font-normal"
      >
        No credit card required.
      </motion.div>
    </motion.div>
  );
};
