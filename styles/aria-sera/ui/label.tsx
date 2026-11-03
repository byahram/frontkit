"use client";

import * as React from "react";
import { cn } from "cn";
import {
  LabelContext,
  Label as LabelPrimitive,
  type LabelProps,
} from "react-aria-components";

function Label({ className, htmlFor, slot, ...props }: LabelProps) {
  const label = (
    <LabelPrimitive
      data-slot="label"
      className={cn(
        "gap-2 font-semibold peer-data-[slot=checkbox]:text-sm peer-data-[slot=radio-group-item]:text-sm peer-data-[slot=switch]:text-sm group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 peer-data-[slot=checkbox]:font-normal peer-data-[slot=radio-group-item]:font-normal peer-data-[slot=switch]:font-normal uppercase text-xs tracking-wide peer-data-[slot=checkbox]:normal-case peer-data-[slot=checkbox]:tracking-normal peer-data-[slot=radio-group-item]:normal-case peer-data-[slot=radio-group-item]:tracking-normal peer-data-[slot=switch]:normal-case peer-data-[slot=switch]:tracking-normal peer-data-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
      htmlFor={htmlFor}
      slot={slot}
    />
  );

  if (htmlFor && slot === undefined) {
    return <LabelContext.Provider value={null}>{label}</LabelContext.Provider>;
  }

  return label;
}

export { Label };
