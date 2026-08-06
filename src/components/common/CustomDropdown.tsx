import { ChevronDown, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface DropdownOption {
    label: string;
    value: string;
}

interface CustomDropdownProps {
    options: (DropdownOption | string)[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
}

export const CustomDropdown = ({
    options,
    value,
    onChange,
    placeholder = "Select option",
    className,
    triggerClassName,
    contentClassName,
}: CustomDropdownProps) => {
    // Normalize string[] or DropdownOption[] into unified object format
    const normalizedOptions: DropdownOption[] = options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt,
    );

    const selectedOption = normalizedOptions.find((opt) => opt.value === value);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    "group relative flex w-full items-center justify-between gap-2 rounded-md border border-neutral-800 bg-[#111111] px-4 py-2.5 text-xs sm:text-sm text-white font-hanken outline-none cursor-pointer hover:border-neutral-700 focus:border-gold-500/50 data-[state=open]:border-gold-500/50 transition-colors",
                    triggerClassName,
                    className,
                )}
            >
                <span className="truncate">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className="size-4 shrink-0 text-neutral-400 group-data-[state=open]:rotate-180 group-data-[state=open]:text-white transition-transform duration-200 pointer-events-none" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={6}
                className={cn(
                    "z-50 w-full min-w-44 max-h-60 overflow-y-auto rounded-md border border-neutral-800 bg-[#111111] p-1 text-white shadow-xl font-hanken",
                    contentClassName,
                )}
            >
                {normalizedOptions.map((option) => {
                    const isSelected = option.value === value;
                    return (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => onChange(option.value)}
                            className={cn(
                                "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs sm:text-sm cursor-pointer outline-none transition-colors",
                                isSelected
                                    ? "bg-neutral-800/80 font-medium text-white"
                                    : "text-neutral-300 hover:bg-neutral-900 hover:text-white focus:bg-neutral-900 focus:text-white",
                            )}
                        >
                            <span className="truncate">{option.label}</span>
                            {isSelected && (
                                <Check className="size-3.5 text-gold-500 shrink-0 ml-2" />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
