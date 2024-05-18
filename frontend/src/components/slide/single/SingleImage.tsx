"use client";

import { motion, type Variants } from "framer-motion";

import { useSlides } from "@/hooks/useSlides";

import { Image } from "./Image";
import { NoImage } from "./NoImage";

const animationVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export const SingleImage = () => {
  const { images, selectedId } = useSlides();

  const hasSelectedId = selectedId.length > 0;
  return (
    <motion.div
      className="flex justify-center items-center px-10 py-10 h-full max-h-full"
      initial={"initial"}
      animate={"animate"}
      variants={animationVariants}
    >
      {!hasSelectedId && <NoImage />}
      {hasSelectedId && (
        <Image src={images.getDataUrl(selectedId)} alt="selected slide" />
      )}
    </motion.div>
  );
};
