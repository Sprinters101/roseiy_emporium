import React, { useState } from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomInputProps {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string;
    touched?: boolean;
    disabled?: boolean;
    isTextArea?: boolean;
    rows?: number;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    id?: string;
    [key: string]: any;
}

const CustomInputComponent: React.FC<CustomInputProps> = (props) => {
    const {
        name,
        label,
        type = "text",
        placeholder,
        value: propValue,
        onChange: propOnChange,
        onBlur: propOnBlur,
        error: propError,
        touched: propTouched,
        disabled,
        isTextArea = false,
        rows = 4,
        className,
        containerClassName,
        labelClassName,
        id,
        ...restProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

    let fieldProps: any = {
        name,
        value: propValue ?? "",
        onChange: propOnChange,
        onBlur: propOnBlur,
    };
    let metaError: string | undefined;
    let metaTouched: boolean | undefined;

    try {
        // useField returns [field, meta, helpers] when inside Formik context
        const [field, meta] = useField(name);
        if (field) {
            fieldProps = field;
            metaError = meta.error;
            metaTouched = meta.touched;
        }
    } catch {
        // Safely fallback to standalone props if outside Formik context
    }

    const errorMessage = propError || (metaTouched ? metaError : undefined);
    const isTouched = propTouched ?? metaTouched;
    const hasError = Boolean(isTouched && errorMessage);

    const inputClasses = cn(
        "w-full bg-black-900 h-10 md:h-12 rounded-lg px-4 py-3.5 text-white text-[0.625rem] md:text-sm placeholder:text-black-200 focus:outline-none focus:border-[#C5A265] transition-colors duration-200",
        hasError && "border-red-500 border focus:border-red-500",
        className,
    );

    return (
        <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
            {label && (
                <label
                    htmlFor={id || name}
                    className={cn(
                        "text-[11px] sm:text-[13px] font-semibold tracking-wider text-gold-500 uppercase",
                        labelClassName,
                    )}
                >
                    {label}
                </label>
            )}

            {isTextArea ? (
                <textarea
                    id={id || name}
                    rows={rows}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(inputClasses, "resize-none")}
                    {...fieldProps}
                    {...restProps}
                />
            ) : (
                <div className="relative w-full">
                    <input
                        id={id || name}
                        type={inputType}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={cn(inputClasses, isPasswordType && "pr-11")}
                        {...fieldProps}
                        {...restProps}
                    />
                    {isPasswordType && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="size-4 text-neutral-400" />
                            ) : (
                                <Eye className="size-4 text-neutral-400" />
                            )}
                        </button>
                    )}
                </div>
            )}

            {hasError && (
                <span className="text-xs text-red-400 font-medium mt-0.5">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

export const CustomInput = CustomInputComponent;
export default CustomInput;
