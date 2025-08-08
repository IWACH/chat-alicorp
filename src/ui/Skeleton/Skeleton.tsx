import { ComponentProps } from "react";

import { cn } from "@/core/utils/cn.util";

const Skeleton = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
};

export default Skeleton;
