import Image from "next/image";
import type { CSSProperties } from "react";

type Props = {
  src?: string | null;
  alt?: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
  [key: string]: any;
};

export function ResponsiveImage({ src, alt = "", className = "", fill = false, sizes, priority, style, ...rest }: Props) {
  if (!src) return null;

  const isExternal = typeof src === "string" && (src.startsWith("http") || src.startsWith("//"));

  if (isExternal) {
    const imgStyle: CSSProperties = fill
      ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...(style || {}) }
      : style || {};

    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={`${className} object-cover`} style={imgStyle} {...(priority ? { loading: "eager" } : {})} {...rest} />
      );
    }

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} style={imgStyle} {...(priority ? { loading: "eager" } : {})} {...rest} />;
  }

  return (
    <Image src={src as string} alt={alt} fill={fill} sizes={sizes} priority={priority} className={className} style={style} {...rest} />
  );
}

export default ResponsiveImage;
