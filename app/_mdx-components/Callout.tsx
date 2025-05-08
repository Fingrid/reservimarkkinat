"use client";

import { labGrotesqueWeb } from "@/_fonts/fonts";
import cn from "clsx";
import type { FC, ReactElement, ReactNode } from "react";
import {
  TipsAndUpdates,
  Info,
  ErrorOutline,
  WarningAmber,
} from "@fingrid/design-system-components";

const TypeToEmoji = {
  default: <TipsAndUpdates height="20" className="x:mt-1" />,
  error: <ErrorOutline height="20" className="x:mt-1" />,
  info: <Info height="20" className="x:mt-1" />,
  important: <Info height="20" className="x:mt-1" />,
  warning: <WarningAmber height="20" className="x:mt-1" />,
};

type CalloutType = keyof typeof TypeToEmoji;

const classes: Record<CalloutType, string> = {
  default: cn("tip"),
  error: cn("error"),
  info: cn("info"),
  warning: cn("warning"),
  important: cn("important"),
};

type CalloutProps = {
  type?: CalloutType;
  emoji?: string | ReactElement;
  className?: string;
  children: ReactNode;
};

export const Callout: FC<CalloutProps> = ({
  children,
  type = "default",
  emoji = TypeToEmoji[type],
  className,
}) => {
  return (
    <div
      className={cn(
        labGrotesqueWeb.variable,
        "nextra-callout x:overflow-x-auto x:mt-6 x:flex x:rounded-lg x:border x:py-2 x:pe-4",
        "x:contrast-more:border-current!",
        classes[type],
        className,
      )}
    >
      <div
        className="x:select-none x:text-xl x:ps-3 x:pe-2 m-auto"
        data-pagefind-ignore="all"
      >
        {emoji}
      </div>
      <div className="x:w-full x:min-w-0">{children}</div>
    </div>
  );
};
