import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn(
        "box-border flex flex-row items-start p-6 gap-2 w-full h-[187px] bg-white border border-black",
        containerClassName
      )}>
        <textarea
          className={cn(
            "flex-grow w-full h-full bg-transparent border-none outline-none resize-none p-0 font-heading",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea }; 