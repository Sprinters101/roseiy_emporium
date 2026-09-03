import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Container from "@/components/common/Container";
import { toast } from "@/components/ui/sonner";
import { useVerifyEmail, useResendOtp } from "@/service";
import { AuthHeader } from "./AuthHeader";
import { heroBg } from "@/lib/site_data";

export const VerifyOtp: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const [timer, setTimer] = useState<number>(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
    const { mutate: resendOtp, isPending: isResending } = useResendOtp();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1);
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input box
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
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

    const handleVerify = () => {
        const fullOtp = otp.join("");
        if (fullOtp.length < 4) {
            toast.error("Please enter the complete 4-digit OTP code");
            return;
        }

        if (!email) {
            toast.error("Email address missing. Please register again.");
            navigate("/register");
            return;
        }

        verifyEmail(
            { email, otp: fullOtp },
            {
                onSuccess: () => {
                    navigate("/login");
                },
            },
        );
    };

    const handleResend = () => {
        if (timer > 0 || isResending) return;

        if (!email) {
            toast.error("Email address missing. Please register again.");
            navigate("/register");
            return;
        }

        resendOtp(
            { email },
            {
                onSuccess: () => {
                    setTimer(30);
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
        <div className="w-full bg-black-900  text-white pt-24 md:pt-32 pb-20 flex flex-col justify-center items-center">
            <Container className="flex flex-col items-center z-10">
                {/* Header */}
                <AuthHeader
                    title="Verify your Email Address"
                    subtitle={
                        <span>
                            We have sent a verification code to <br />
                            <span className="text-gold-500 font-semibold block sm:inline mt-0.5 sm:mt-0">
                                {email}
                            </span>
                        </span>
                    }
                />

                {/* Card Container */}
                <div className="bg-black-700 rounded-lg p-6 sm:p-8 max-w-[688px] w-full border border-neutral-800/60 shadow-2xl mt-6">
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
                                className="w-12 h-12 sm:w-16 sm:h-16 bg-black-900 rounded-lg border border-neutral-800 text-center text-xl sm:text-2xl font-bold text-white focus:outline-none focus:border-gold-500 transition-colors"
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleVerify}
                        disabled={isVerifying || isResending}
                        className="w-full mt-6 h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center font-hanken"
                    >
                        {isVerifying ? "Verifying..." : "Verify OTP"}
                    </button>

                    {/* Resend Code Timer */}
                    <div className="text-xs sm:text-sm font-hanken text-center mt-6">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={timer > 0 || isResending}
                            className={`font-semibold md:text-base text-sm gradient-text transition-colors ${
                                timer > 0 || isResending
                                    ? " cursor-not-allowed opacity-80"
                                    : " hover:underline cursor-pointer"
                            }`}
                        >
                            {isResending ? "Resending..." : "Resend Code"}
                        </button>{" "}
                        <span className="text-white">
                            {timer > 0 ? `in ${formatTimer(timer)}` : ""}
                        </span>
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
