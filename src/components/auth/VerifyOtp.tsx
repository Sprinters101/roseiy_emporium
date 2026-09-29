import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import Container from "@/components/common/Container";
import { toast } from "@/components/ui/sonner";
import { useVerifyEmail, useResendOtp } from "@/service";
import { AuthHeader } from "./AuthHeader";
import { heroBg } from "@/lib/site_data";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const VerifyOtp: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const initialEmail =
        location.state?.email || searchParams.get("email") || "";

    const [email, setEmail] = useState<string>(initialEmail);
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(!initialEmail);
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const [timer, setTimer] = useState<number>(30);
    const [isResending, setIsResending] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const hasAutoResentRef = useRef<boolean>(false);

    const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
    const resendOtpMutation = useResendOtp();

    // Auto-resend OTP once on mount if redirected from unverified login error
    useEffect(() => {
        if (
            location.state?.autoResend &&
            initialEmail &&
            !hasAutoResentRef.current
        ) {
            hasAutoResentRef.current = true;
            setIsResending(true);
            setTimer(30);
            resendOtpMutation.mutate(
                { email: initialEmail },
                {
                    onSuccess: () => {
                        setTimer(30);
                    },
                    onError: () => {
                        setTimer(30);
                    },
                    onSettled: () => {
                        setIsResending(false);
                    },
                },
            );
        }
    }, [initialEmail, location.state?.autoResend, resendOtpMutation]);

    // Resend countdown timer
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleVerify = (otpValue?: string) => {
        const fullOtp = typeof otpValue === "string" ? otpValue : otp.join("");
        if (fullOtp.length < 4) {
            toast.error("Please enter the complete 4-digit OTP code");
            return;
        }

        const cleanEmail = email.trim();
        if (!cleanEmail) {
            toast.error("Please enter your email address.");
            setIsEditingEmail(true);
            return;
        }

        verifyEmail(
            { email: cleanEmail, otp: fullOtp },
            {
                onSuccess: (res) => {
                    toast.success(
                        res?.message ||
                            "Email verified successfully! Please log in.",
                    );
                    navigate("/login", {
                        state: {
                            email: cleanEmail,
                            from: location.state?.from,
                        },
                    });
                },
            },
        );
    };

    const handleOtpChange = (index: number, value: string) => {
        const cleaned = value.replace(/\D/g, "");

        if (cleaned.length > 1) {
            const digits = cleaned.slice(0, 4).split("");
            const newOtp = [...otp];
            digits.forEach((d, i) => {
                if (index + i < 4) newOtp[index + i] = d;
            });
            setOtp(newOtp);
            const nextIdx = Math.min(index + digits.length, 3);
            inputRefs.current[nextIdx]?.focus();
            if (newOtp.join("").length === 4) {
                handleVerify(newOtp.join(""));
            }
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = cleaned;
        setOtp(newOtp);

        // Auto-focus next input box
        if (cleaned && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto verify when 4th digit is entered
        if (cleaned && index === 3 && newOtp.join("").length === 4) {
            handleVerify(newOtp.join(""));
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text")
            .trim()
            .replace(/\D/g, "")
            .slice(0, 4);
        if (!pastedData) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, idx) => {
            if (idx < 4) newOtp[idx] = char;
        });
        setOtp(newOtp);

        const nextFocusIndex = Math.min(pastedData.length, 3);
        inputRefs.current[nextFocusIndex]?.focus();

        if (newOtp.join("").length === 4) {
            handleVerify(newOtp.join(""));
        }
    };

    const handleResend = () => {
        if (timer > 0 || isResending) return;

        const cleanEmail = email.trim();
        if (!cleanEmail) {
            toast.error("Please enter your email address.");
            setIsEditingEmail(true);
            return;
        }

        setIsResending(true);
        resendOtpMutation.mutate(
            { email: cleanEmail },
            {
                onSuccess: () => {
                    setTimer(30);
                },
                onError: () => {
                    setTimer(30);
                },
                onSettled: () => {
                    setIsResending(false);
                },
            },
        );
    };

    const formatTimer = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="w-full bg-black-900 text-white pt-24 md:pt-32 pb-20 flex flex-col justify-center items-center">
            <Container className="flex flex-col items-center z-10">
                {/* Header */}
                <AuthHeader
                    title="Verify your Email Address"
                    subtitle={
                        email ? (
                            <span>
                                We have sent a verification code to <br />
                                <span className="text-gold-500 font-semibold block sm:inline mt-0.5 sm:mt-0">
                                    {email}
                                </span>
                            </span>
                        ) : (
                            "Please enter your email and the 4-digit verification code"
                        )
                    }
                />

                {/* Card Container */}
                <div className="bg-black-700 rounded-lg p-6 sm:p-8 max-w-[688px] w-full border border-neutral-800/60 shadow-2xl mt-6">
                    {/* Optional Email Input if not provided */}
                    {isEditingEmail && (
                        <div className="mb-6 flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gold-500 uppercase tracking-wider">
                                Your Email Address
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 size-4 text-neutral-400 pointer-events-none" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full bg-black-900 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-gold-500 font-hanken"
                                />
                            </div>
                        </div>
                    )}

                    {/* 4 OTP Input Boxes */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 my-4">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={(el) => {
                                    inputRefs.current[idx] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleOtpChange(idx, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                onPaste={handlePaste}
                                className="w-12 h-12 sm:w-16 sm:h-16 bg-black-900 rounded-lg border border-neutral-800 text-center text-xl sm:text-2xl font-bold text-white focus:outline-none focus:border-gold-500 transition-colors"
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={() => handleVerify()}
                        disabled={isVerifying}
                        className="w-full mt-6 h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center font-hanken"
                    >
                        {isVerifying ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            "Verify OTP"
                        )}
                    </button>

                    {/* Resend Code Timer */}
                    <div className="text-xs sm:text-sm font-hanken text-center mt-6 flex items-center justify-center gap-1.5">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={timer > 0 || isResending}
                            className={cn(
                                "font-semibold md:text-base text-sm gradient-text transition-colors",
                                timer > 0 || isResending
                                    ? "cursor-not-allowed opacity-70"
                                    : "hover:underline cursor-pointer opacity-100",
                            )}
                        >
                            {isResending ? "Sending code..." : "Resend Code"}
                        </button>
                        {timer > 0 && !isResending && (
                            <span className="text-neutral-400 text-xs sm:text-sm">
                                in {formatTimer(timer)}
                            </span>
                        )}
                    </div>

                    {/* Back to Login Link */}
                    <div className="text-center mt-6 pt-4 border-t border-neutral-800">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-gold-400 transition-colors"
                        >
                            <ArrowLeft className="size-3.5" />
                            <span>Back to Log In</span>
                        </Link>
                    </div>
                </div>
            </Container>

            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <img
                    src={heroBg}
                    alt="Premium selection background"
                    className="w-full h-full object-cover object-center"
                />
            </div>
        </div>
    );
};

export default VerifyOtp;
