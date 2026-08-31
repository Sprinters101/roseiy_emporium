import React from "react";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ActionDropdownItem {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export interface ActionDropdownProps {
    items: ActionDropdownItem[];
    trigger?: React.ReactNode;
    triggerClassName?: string;
    contentClassName?: string;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    ariaLabel?: string;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
    items,
    trigger,
    triggerClassName,
    contentClassName,
    align = "end",
    side = "bottom",
    ariaLabel = "More actions",
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {trigger ? (
                    trigger
                ) : (
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className={cn(
                            "text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer",
                            triggerClassName,
                        )}
                        aria-label={ariaLabel}
                    >
                        <MoreVertical className="size-5" />
                    </Button>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align={align}
                side={side}
                sideOffset={6}
                className={cn(
                    "z-50 min-w-32 bg-black-700 border border-neutral-800/80 text-white rounded-lg shadow-2xl p-1 font-hanken outline-none",
                    contentClassName,
                )}
            >
                {items.map((item, idx) => (
                    <DropdownMenuItem
                        key={idx}
                        onClick={item.onClick}
                        disabled={item.disabled}
                        className={cn(
                            "flex items-center justify-center gap-2.5 w-full px-3.5 py-2 text-xs sm:text-sm font-medium text-white hover:bg-white/10 text-center rounded-md cursor-pointer transition-colors outline-none",
                            item.className,
                        )}
                    >
                        {item.icon && (
                            <span className="shrink-0">{item.icon}</span>
                        )}
                        <span>{item.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionDropdown;
