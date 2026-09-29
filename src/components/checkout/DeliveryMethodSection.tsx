import React, { useState } from "react";
import {
    Truck,
    Clock,
    Check,
    Store,
    ChevronDown,
    X,
    ShieldCheck,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { DeliveryArea } from "@/service/types";

export interface DeliveryMethodSectionProps {
    deliveryAreas: DeliveryArea[];
    selectedAreaId: string;
    onSelectArea: (areaId: string) => void;
    isLoading?: boolean;
}

export const DeliveryMethodSection: React.FC<DeliveryMethodSectionProps> = ({
    deliveryAreas,
    selectedAreaId,
    onSelectArea,
    isLoading = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedArea = deliveryAreas.find(
        (area) => area.deliveryAreaId === selectedAreaId,
    );

    const isNoDeliverySelected = !selectedAreaId || !selectedArea;

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
            {/* Header */}
            <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                        <Truck className="size-4.5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-playfair font-bold text-xl sm:text-[1.25rem] text-white">
                                Delivery Method & Area
                            </h2>
                        </div>
                        <p className="text-xs text-neutral-400 font-hanken mt-0.5">
                            Select a shipping area for doorstep delivery, or
                            choose no delivery for pickup
                        </p>
                    </div>
                </div>
            </div>

            {/* Dropdown Container */}
            {isLoading ? (
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-14 w-full rounded-xl bg-neutral-800" />
                </div>
            ) : (
                <div className="flex flex-col gap-3 w-full">
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger
                            className={cn(
                                "group relative flex w-full items-center justify-between gap-3 rounded-xl border bg-black-900/90 px-4 py-3.5 text-sm text-white font-hanken outline-none cursor-pointer transition-all duration-200 hover:border-neutral-700",
                                isOpen
                                    ? "border-gold-400 shadow-[0_0_16px_rgba(228,196,91,0.12)]"
                                    : "border-neutral-800/90",
                            )}
                        >
                            {/* Left Side: Current Selection Display */}
                            <div className="flex items-center gap-3 min-w-0 flex-1 text-left">
                                {isNoDeliverySelected ? (
                                    <>
                                        <div className="size-7 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                                            <Store className="size-4 text-neutral-400" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-semibold text-neutral-200 truncate">
                                                No Delivery / Store Pickup
                                            </span>
                                            <span className="text-[11px] text-neutral-400">
                                                No shipping fee (₦0)
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="size-7 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                                            <Truck className="size-4" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-semibold text-white truncate group-hover:text-gold-200 transition-colors">
                                                {selectedArea.name}
                                            </span>
                                            {selectedArea.estimatedDeliveryTime && (
                                                <span className="text-[11px] text-gold-400/90 flex items-center gap-1 font-light">
                                                    <Clock className="size-2.5" />
                                                    Est.{" "}
                                                    {
                                                        selectedArea.estimatedDeliveryTime
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right Side: Fee Badge & Chevron */}
                            <div className="flex items-center gap-2.5 shrink-0 pl-2">
                                <span
                                    className={cn(
                                        "text-xs font-bold px-2.5 py-1 rounded-md tracking-wider font-hanken",
                                        isNoDeliverySelected
                                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                            : "bg-gold-500/10 text-gold-400 border border-gold-500/20",
                                    )}
                                >
                                    {isNoDeliverySelected
                                        ? "₦0 (Free)"
                                        : Number(selectedArea.fee) > 0
                                          ? `₦${Number(selectedArea.fee).toLocaleString()}`
                                          : "Free"}
                                </span>
                                <ChevronDown
                                    className={cn(
                                        "size-4.5 text-neutral-400 transition-transform duration-200 pointer-events-none",
                                        isOpen && "rotate-180 text-gold-400",
                                    )}
                                />
                            </div>
                        </DropdownMenuTrigger>

                        {/* Dropdown Options */}
                        <DropdownMenuContent
                            align="start"
                            sideOffset={6}
                            className="z-50 w-[var(--anchor-width)] min-w-80 max-h-80 overflow-y-auto rounded-xl border border-neutral-800 bg-[#121212] p-2 text-white shadow-2xl font-hanken flex flex-col gap-1 backdrop-blur-md"
                        >
                            {/* Option 1: No Delivery */}
                            <DropdownMenuItem
                                onClick={() => {
                                    onSelectArea("");
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer outline-none transition-colors",
                                    isNoDeliverySelected
                                        ? "bg-neutral-800/90 border border-neutral-700/80 text-white font-medium"
                                        : "hover:bg-neutral-900 text-neutral-300 hover:text-white",
                                )}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="size-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                                        <Store className="size-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-semibold text-sm">
                                            No Delivery / Store Pickup
                                        </span>
                                        <span className="text-[11px] text-neutral-400">
                                            Pick up your order in store (No
                                            delivery fee)
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                                        Free
                                    </span>
                                    {isNoDeliverySelected && (
                                        <Check className="size-4 text-gold-400 ml-1" />
                                    )}
                                </div>
                            </DropdownMenuItem>

                            {deliveryAreas.length > 0 && (
                                <>
                                    <DropdownMenuSeparator className="bg-neutral-800 my-1" />
                                    <div className="text-[11px] uppercase tracking-wider text-gold-500/90 px-3 py-1 font-bold">
                                        Doorstep Delivery Areas
                                    </div>
                                </>
                            )}

                            {/* Option 2..N: Delivery Areas */}
                            {deliveryAreas.map((area) => {
                                const isSelected =
                                    selectedAreaId === area.deliveryAreaId;
                                const feeNumber = Number(area.fee) || 0;

                                return (
                                    <DropdownMenuItem
                                        key={area.deliveryAreaId}
                                        onClick={() => {
                                            onSelectArea(area.deliveryAreaId);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer outline-none transition-colors",
                                            isSelected
                                                ? "bg-neutral-800/90 border border-gold-500/30 text-white font-medium shadow-[0_0_12px_rgba(228,196,91,0.06)]"
                                                : "hover:bg-neutral-900 text-neutral-300 hover:text-white",
                                        )}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div
                                                className={cn(
                                                    "size-8 rounded-lg flex items-center justify-center shrink-0",
                                                    isSelected
                                                        ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                                                        : "bg-neutral-800/60 text-neutral-400",
                                                )}
                                            >
                                                <Truck className="size-4" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-semibold text-sm truncate">
                                                    {area.name}
                                                </span>
                                                {area.estimatedDeliveryTime && (
                                                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                                                        <Clock className="size-2.5 text-gold-400 shrink-0" />
                                                        Est.{" "}
                                                        {
                                                            area.estimatedDeliveryTime
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0 pl-2">
                                            <span className="text-xs font-bold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                                                ₦{feeNumber.toLocaleString()}
                                            </span>
                                            {isSelected && (
                                                <Check className="size-4 text-gold-400 ml-1" />
                                            )}
                                        </div>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Active Selection Details Card */}
                    {selectedArea ? (
                        <div className="bg-black-900/60 rounded-xl p-4 border border-gold-500/20 flex items-center justify-between gap-3">
                            <div className="flex items-start gap-2.5 min-w-0">
                                <ShieldCheck className="size-4 text-gold-400 shrink-0 mt-0.5" />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-white font-medium">
                                        Doorstep delivery selected for{" "}
                                        <strong className="text-gold-400 font-semibold">
                                            {selectedArea.name}
                                        </strong>
                                    </span>
                                    {selectedArea.estimatedDeliveryTime && (
                                        <span className="text-[11px] text-neutral-400 mt-0.5">
                                            Estimated Arrival:{" "}
                                            {selectedArea.estimatedDeliveryTime}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => onSelectArea("")}
                                className="text-neutral-400 hover:text-red-400 p-1 rounded-md transition-colors shrink-0 flex items-center gap-1 text-xs font-hanken cursor-pointer"
                                title="Remove delivery / Switch to pickup"
                            >
                                <X className="size-3.5" />
                                <span className="hidden sm:inline">Remove</span>
                            </button>
                        </div>
                    ) : (
                        <div className="bg-black-900/40 rounded-xl p-3.5 border border-neutral-800/60 flex items-center gap-2.5 text-xs text-neutral-400 font-hanken">
                            <Store className="size-4 text-gold-500/70 shrink-0" />
                            <span>
                                No delivery selected. You can pick up your order
                                at our store at no additional cost.
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DeliveryMethodSection;
