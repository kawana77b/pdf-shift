/* eslint-disable @next/next/no-img-element */

export interface ImageProps {
  src: string;
  alt: string;
}

export const Image = ({ src, alt }: ImageProps) => {
  if (!src) return null;
  return (
    <img
      className="rounded-md border-[1px] shadow-xl"
      src={src}
      alt={alt}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
      height={"100%"}
    />
  );
};
