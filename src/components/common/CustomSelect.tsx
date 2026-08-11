import React from "react";
import { useField } from "formik";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomSelectOption {
    label: string;
    value: string;
}

export interface CustomSelectProps {
    name: string;
    label?: string;
    options: (CustomSelectOption | string)[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    touched?: boolean;
    disabled?: boolean;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    id?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = (props) => {
    const {
        name,
        label,
        options,
        placeholder = "Select Option",
        value: propValue,
        onChange: propOnChange,
        error: propError,
        touched: propTouched,
        disabled,
        className,
        containerClassName,
        labelClassName,
        id,
    } = props;

    let fieldValue = propValue ?? "";
    let metaError: string | undefined;
    let metaTouched: boolean | undefined;
    let helpers: any;

    try {
        const [field, meta, formHelpers] = useField(name);
        if (field) {
            fieldValue = field.value;
            metaError = meta.error;
            metaTouched = meta.touched;
            helpers = formHelpers;
        }
    } catch {
        // Outside Formik context
    }

    const errorMessage = propError || (metaTouched ? metaError : undefined);
    const isTouched = propTouched ?? metaTouched;
    const hasError = Boolean(isTouched && errorMessage);

    const normalizedOptions: CustomSelectOption[] = options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
    );

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (helpers) {
            helpers.setValue(val);
        }
        if (propOnChange) {
            propOnChange(val);
        }
    };

    return (
        <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
            {label && (
                <label
                    htmlFor={id || name}
                    className={cn(
                        "text-[11px] sm:text-[13px] font-semibold tracking-wider text-gold-500 uppercase",
                        labelClassName
                    )}
                >
                    {label}
                </label>
            )}

            <div className="relative w-full">
                <select
                    id={id || name}
                    name={name}
                    value={fieldValue}
                    onChange={handleSelectChange}
                    disabled={disabled}
                    className={cn(
                        "w-full bg-black-900 h-12 rounded-lg px-4 py-3 text-white text-sm appearance-none outline-none focus:border-[#C5A265] border border-transparent transition-colors cursor-pointer pr-10",
                        hasError && "border-red-500 focus:border-red-500",
                        !fieldValue && "text-neutral-400",
                        className
                    )}
                >
                    {placeholder && (
                        <option value="" disabled className="bg-black-900 text-neutral-400">
                            {placeholder}
                        </option>
                    )}
                    {normalizedOptions.map((opt) => (
                        <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-black-900 text-white py-2"
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>

            {hasError && (
                <span className="text-xs text-red-400 font-medium mt-0.5">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

export default CustomSelect;
