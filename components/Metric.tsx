import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IMetricProps {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles: string;
  href?: string;
  imgStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({ imgUrl, alt, value, title, href, textStyles, imgStyles, isAuthor }: IMetricProps) => {
  const metricContent = (
    <>
      <Image src={imgUrl} width={16} height={16} alt={alt} className={`rounded-full object-contain ${imgStyles}`} />
      <p className={`flex items-center ${textStyles} gap-1`}>
        {value}
        <span className={`small-regular line-clamp-1 ${isAuthor ? "max-small:hidden" : ""}`}>{title}</span>
      </p>
    </>
  );
  return href ? (
    <Link className="flex-center gap-1" href={href}>
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
