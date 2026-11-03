"use client";

import * as React from "react";
import { cn } from "cn";
import {
  composeRenderProps,
  TextArea as TextareaPrimitive,
} from "react-aria-components";

function Textarea({
  className,
  ...props
}: React.ComponentProps<typeof TextareaPrimitive>) {
  return (
    <TextareaPrimitive
      data-slot="textarea"
      className={composeRenderProps(className, (className) =>
        cn(
          "border-transparent border-b-input bg-transparent focus-visible:border-b-ring aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50 resize-none rounded-none border px-0 py-3 text-base transition-[color,border-color] md:text-sm flex field-sizing-content min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ),
      )}
      {...props}
    />
  );
}

export { Textarea };
