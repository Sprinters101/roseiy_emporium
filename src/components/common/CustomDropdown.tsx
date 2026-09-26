import React, { useState, useMemo } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
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

export interface CustomDropdownProps {
    options: (DropdownOption | string)[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    disabled?: boolean;
    hasError?: boolean;
    align?: "start" | "end" | "center";
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select option",
    searchable = false,
    searchPlaceholder = "Search...",
    disabled = false,
    hasError = false,
    align = "start",
    className,
    triggerClassName,
    contentClassName,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Normalize string[] or DropdownOption[] into unified object format
    const normalizedOptions: DropdownOption[] = useMemo(
        () =>
            options.map((opt) =>
                typeof opt === "string" ? { label: opt, value: opt } : opt,
            ),
        [options],
    );

    const selectedOption = useMemo(
        () => normalizedOptions.find((opt) => opt.value === value),
        [normalizedOptions, value],
    );

    const filteredOptions = useMemo(() => {
        if (!searchQuery.trim()) return normalizedOptions;
        const q = searchQuery.toLowerCase();
        return normalizedOptions.filter(
            (opt) =>
                opt.label.toLowerCase().includes(q) ||
                opt.value.toLowerCase().includes(q),
        );
    }, [normalizedOptions, searchQuery]);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setSearchQuery("");
        }
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger
                disabled={disabled}
                className={cn(
                    "group relative flex w-full items-center justify-between gap-2 rounded-md border border-neutral-800 bg-[#111111] px-4 py-2.5 text-xs sm:text-sm text-white font-hanken outline-none cursor-pointer hover:border-neutral-700 focus:border-gold-500/50 data-[state=open]:border-gold-500/50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
                    hasError && "border-red-500/80 focus:border-red-500",
                    triggerClassName,
                    className,
                )}
            >
                <span
                    className={cn(
                        "truncate text-left",
                        !selectedOption && "text-neutral-400",
                    )}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className="size-4 shrink-0 text-neutral-400 group-data-[state=open]:rotate-180 group-data-[state=open]:text-white transition-transform duration-200 pointer-events-none" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align={align}
                sideOffset={6}
                className={cn(
                    "z-60 w-[var(--anchor-width)] min-w-48 max-h-64 overflow-hidden rounded-lg border border-neutral-800 bg-[#111111] p-1 text-white shadow-2xl font-hanken flex flex-col",
                    contentClassName,
                )}
            >
                {searchable && (
                    <div
                        className="p-1.5 border-b border-neutral-800/80 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative flex items-center">
                            <Search className="absolute left-2.5 size-3.5 text-neutral-400 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                                placeholder={searchPlaceholder}
                                className="w-full bg-black-900 border border-neutral-800 rounded px-2.5 py-1.5 pl-8 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-gold-500/60 font-hanken"
                                autoFocus
                            />
                        </div>
                    </div>
                )}

                <div className="overflow-y-auto max-h-52 flex flex-col gap-0.5 p-0.5">
                    {filteredOptions.length === 0 ? (
                        <div className="py-4 text-center text-xs text-neutral-400 font-hanken">
                            No options found
                        </div>
                    ) : (
                        filteredOptions.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <DropdownMenuItem
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs sm:text-sm cursor-pointer outline-none transition-colors",
                                        isSelected
                                            ? "bg-neutral-800/80 font-medium text-white"
                                            : "text-neutral-300 hover:bg-neutral-900 hover:text-white focus:bg-neutral-900 focus:text-white",
                                    )}
                                >
                                    <span className="truncate">
                                        {option.label}
                                    </span>
                                    {isSelected && (
                                        <Check className="size-3.5 text-gold-500 shrink-0 ml-2" />
                                    )}
                                </DropdownMenuItem>
                            );
                        })
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

