import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TbSquareRounded, TbSquareRoundedCheckFilled } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface CustomCheckboxProps {
    id?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label: string;
    count?: number | string;
    className?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    id,
    checked,
    onCheckedChange,
    label,
    count,
    className,
}) => {
    return (
        <label
            htmlFor={id || label}
            className={cn(
                "flex items-center  justify-between w-full cursor-pointer group text-xs font-hanken select-none",
                className,
            )}
        >
            <div className="flex items-center gap-2.5">
                {/* Hidden accessible Shadcn Checkbox */}
                <Checkbox
                    id={id || label}
                    checked={checked}
                    onCheckedChange={(val) => onCheckedChange(!!val)}
                    className="sr-only hidden "
                />

                {/* Custom Icon Representation */}
                {checked ? (
                    <TbSquareRoundedCheckFilled className="size-3.5 text-gold-500 shrink-0" />
                ) : (
                    <TbSquareRounded className="size-3.5 text-gold-500 shrink-0" />
                )}

                {/* Label Text */}
                <span
                    className={cn(
                        "transition-colors",
                        checked
                            ? "gradient-text font-semibold"
                            : "text-neutral-300 group-hover:text-white",
                    )}
                >
                    {label}
                </span>
            </div>

            {/* Optional Count Indicator */}
            {count !== undefined && (
                <span
                    className={cn(
                        "transition-colors",
                        checked
                            ? "gradient-text font-semibold"
                            : "text-neutral-500",
                    )}
                >
                    ({count.toString().padStart(2, "0")})
                </span>
            )}
        </label>
    );
};
