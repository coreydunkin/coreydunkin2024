"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const Button = ({
  href,
  text,
  color,
  animate,
}: {
  href: string;
  text: string;
  color?: string;
  animate?: boolean;
}) => {
  return (
    <Link href={href} passHref>
      <motion.button
        className={`
          ${color || "bg-opacity-0 border-gray-100"}
          ${color && "border-0"}
          text-gray-100
          font-medium
          rounded-md
          py-2
          px-4
          border
          mt-5
        `}
        initial={{ opacity: `${animate ? 0 : 1}` }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.2,
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
      >
        {text}
      </motion.button>
    </Link>
  );
};

export default Button;
