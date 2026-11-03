import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const markerVariants = cva(
  "gap-2 text-sm text-muted-foreground [a]:hover:text-foreground [a]:underline-offset-3 [a]:underline [&_svg:not([class*='size-'])]:size-4 min-h-4 text-left group/marker relative flex w-full items-center",
  {
    variants: {
      variant: {
        default: "",
        separator:
          "before:h-px before:min-w-0 before:flex-1 before:bg-border after:h-px after:min-w-0 after:flex-1 after:bg-border before:mr-1 after:ml-1",
        border: "border-b border-border pb-2",
      },
    },
  },
);

function Marker({
  className,
  variant = "default",
  render,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof markerVariants> & {
    render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode;
  }) {
  if (render) {
    const renderProps = {
      ...props,
      "data-slot": "marker",
      "data-variant": variant,
      className: cn(markerVariants({ variant, className })),
      children,
    };

    return render(renderProps);
  }

  return (
    <div
      {...props}
      data-slot="marker"
      data-variant={variant}
      className={cn(markerVariants({ variant, className }))}
    >
      {children}
    </div>
  );
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn(
        "size-4 [&_svg:not([class*='size-'])]:size-4 shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:hover:text-foreground *:[a]:underline *:[a]:underline-offset-3 min-w-0 wrap-break-word",
        className,
      )}
      {...props}
    />
  );
}

export { Marker, MarkerIcon, MarkerContent, markerVariants };
