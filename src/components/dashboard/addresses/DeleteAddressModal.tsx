import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Trash2, X, Loader2 } from "lucide-react";
import type { AddressItem } from "./types";

export interface DeleteAddressModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    address?: AddressItem | null;
    onConfirm: () => Promise<void> | void;
    isDeleting?: boolean;
}

export const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({
    open,
    onOpenChange,
    onConfirm,
    isDeleting = false,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="bg-black/80 backdrop-blur-md z-50" />
            <DialogContent
                showCloseButton={false}
                className="bg-black-700  rounded-lg p-6 sm:p-7 w-full sm:max-w-xl text-white z-50 shadow-2xl ring-0 outline-none"
            >
                {/* Header: Title & Close Button */}
                <div className="flex items-center justify-between w-full">
                    <h2 className="font-playfair font-bold text-xl sm:text-[1.375rem] text-white tracking-tight">
                        Delete Address
                    </h2>
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        disabled={isDeleting}
                        className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
                        aria-label="Close dialog"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex flex-col items-center justify-center text-center my-6 sm:my-8 gap-4 sm:gap-5">
                    {/* Trash Icon Badge */}
                    <div className="size-20 sm:size-24 rounded-full bg-[#2a1315] border border-red-500/20 flex items-center justify-center shadow-inner">
                        <Trash2 className="size-8 sm:size-9 text-red-500 stroke-[1.75]" />
                    </div>

                    {/* Confirmation Prompt */}
                    <p className="font-hanken text-sm sm:text-base text-neutral-300 font-normal max-w-xs md:max-w-md leading-relaxed">
                        Are you sure you want to delete this address??
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        disabled={isDeleting}
                        className="w-full bg-black-900 border border-neutral-700/80 text-white font-hanken font-medium text-sm sm:text-base py-3 sm:py-3.5 px-4 rounded-lg hover:bg-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="w-full bg-[#b91c1c] hover:bg-red-700 text-white font-hanken font-medium text-sm sm:text-base py-3 sm:py-3.5 px-4 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 text-center"
                    >
                        {isDeleting && (
                            <Loader2 className="size-4 animate-spin" />
                        )}
                        <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAddressModal;
