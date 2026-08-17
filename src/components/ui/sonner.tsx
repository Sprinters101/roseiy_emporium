import React from "react";
import { useTheme } from "next-themes";
import {
    Toaster as Sonner,
    toast as sonnerToast,
    type ToasterProps,
} from "sonner";
import { Check, X, AlertTriangle, Info } from "lucide-react";

interface CustomToastProps {
    id: string | number;
    type?: "success" | "error" | "warning" | "info" | "default";
    title?: string;
    description?: React.ReactNode;
}

export const CustomToastCard = ({
    id,
    type = "success",
    title,
    description,
}: CustomToastProps) => {
    const defaultTitle =
        type === "success"
            ? "Successful"
            : type === "error"
              ? "Failed"
              : type === "warning"
                ? "Warning"
                : type === "info"
                  ? "Notice"
                  : "";

    const displayTitle = title || defaultTitle;

    return (
        <div className="flex items-start gap-3.5 w-[360px] max-w-[calc(100vw-32px)] bg-[#18181B] border border-white/10 text-white rounded-[14px] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all select-none">
            {/* Icon Badge */}
            {type === "error" && (
                <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0 text-black mt-0.5">
                    <X className="w-4 h-4 stroke-[3]" />
                </div>
            )}
            {type === "success" && (
                <div className="w-8 h-8 rounded-full bg-[#4EBE7E] flex items-center justify-center shrink-0 text-black mt-0.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                </div>
            )}
            {type === "warning" && (
                <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0 text-black mt-0.5">
                    <AlertTriangle className="w-4 h-4 stroke-[3]" />
                </div>
            )}
            {type === "info" && (
                <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center shrink-0 text-black mt-0.5">
                    <Info className="w-4 h-4 stroke-[3]" />
                </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0 pr-1">
                {displayTitle && (
                    <h4 className="text-[15px] font-semibold text-white leading-tight">
                        {displayTitle}
                    </h4>
                )}
                {description && (
                    <p className="text-[13.5px] text-[#9CA3AF] font-normal leading-snug mt-1">
                        {description}
                    </p>
                )}
            </div>

            {/* Close button */}
            <button
                type="button"
                onClick={() => sonnerToast.dismiss(id)}
                className="text-[#9CA3AF] hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-md shrink-0 cursor-pointer"
                aria-label="Close toast"
            >
                <X className="w-4 h-4 stroke-[2]" />
            </button>
        </div>
    );
};

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "dark" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                unstyled: true,
                classNames: {
                    toast: "bg-transparent border-0 p-0 shadow-none",
                },
            }}
            {...props}
        />
    );
};

// Custom toast helper object matching the project design
type ToastOptions = {
    title?: string;
    description?: React.ReactNode;
    duration?: number;
    [key: string]: any;
};

const toastFn = (message: React.ReactNode, options?: ToastOptions) => {
    return toastFn.info(message, options);
};

toastFn.success = (message: React.ReactNode, options?: ToastOptions) => {
    const title =
        options?.title ||
        (options?.description
            ? typeof message === "string"
                ? message
                : undefined
            : "Successful");
    const description =
        options?.description || (options?.title ? message : message);
    const duration = options?.duration || 4000;

    return sonnerToast.custom(
        (id) => (
            <CustomToastCard
                id={id}
                type="success"
                title={title}
                description={description}
            />
        ),
        { duration, ...options },
    );
};

toastFn.error = (message: React.ReactNode, options?: ToastOptions) => {
    const title =
        options?.title ||
        (options?.description
            ? typeof message === "string"
                ? message
                : undefined
            : "Failed");
    const description =
        options?.description || (options?.title ? message : message);
    const duration = options?.duration || 4000;

    return sonnerToast.custom(
        (id) => (
            <CustomToastCard
                id={id}
                type="error"
                title={title}
                description={description}
            />
        ),
        { duration, ...options },
    );
};

toastFn.warning = (message: React.ReactNode, options?: ToastOptions) => {
    const title =
        options?.title ||
        (options?.description
            ? typeof message === "string"
                ? message
                : undefined
            : "Warning");
    const description =
        options?.description || (options?.title ? message : message);
    const duration = options?.duration || 4000;

    return sonnerToast.custom(
        (id) => (
            <CustomToastCard
                id={id}
                type="warning"
                title={title}
                description={description}
            />
        ),
        { duration, ...options },
    );
};

toastFn.info = (message: React.ReactNode, options?: ToastOptions) => {
    const title =
        options?.title ||
        (options?.description
            ? typeof message === "string"
                ? message
                : undefined
            : "Notice");
    const description =
        options?.description || (options?.title ? message : message);
    const duration = options?.duration || 4000;

    return sonnerToast.custom(
        (id) => (
            <CustomToastCard
                id={id}
                type="info"
                title={title}
                description={description}
            />
        ),
        { duration, ...options },
    );
};

toastFn.dismiss = sonnerToast.dismiss;
toastFn.custom = sonnerToast.custom;
toastFn.promise = sonnerToast.promise;

export { Toaster, toastFn as toast };
