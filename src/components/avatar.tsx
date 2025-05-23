import React from "react";
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

function Avatar({
  src,
  fb,
  className,
}: {
  src?: string | null;
  fb?: string | null;
  className?: string;
}) {
  return (
    <AvatarComponent className={className}>
      <AvatarImage src={src!} alt={fb!} />
      <AvatarFallback>{fb?.slice(0, 2)?.toUpperCase()}</AvatarFallback>
    </AvatarComponent>
  );
}

export default Avatar;
