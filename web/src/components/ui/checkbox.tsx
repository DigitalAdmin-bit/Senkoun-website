import * as React from "react";

import {cn} from "@/lib/utils";

function Checkbox({className, ...props}: React.ComponentProps<"input">) {
    return (
        <input
            type="checkbox"
            data-slot="checkbox"
            className={cn(
                "h-4 w-4 shrink-0 rounded border border-input bg-transparent text-primary shadow-xs transition-colors outline-none",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "checked:bg-primary checked:border-primary",
                className,
            )}
            {...props}
        />
    );
}

export {Checkbox};
