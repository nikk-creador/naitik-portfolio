import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.12, ease: "easeOut" },
  }),
};

type ScrollCardProps = {
  index: number;
  children: React.ReactNode;
};

export const ScrollCard: React.FC<ScrollCardProps> = ({ index, children }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={CARD_VARIANTS}
      custom={index}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
    >
      {children}
    </motion.div>
  );
};
