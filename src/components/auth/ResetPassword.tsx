import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@/components/common/Container";
import { CustomInput } from "@/components/common/CustomInput";
import { useResetPassword, useForgotPassword } from "@/service";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";
import { heroBg } from "@/lib/site_data";
import { toast } from "@/components/ui/sonner";

const ResetPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    otp: Yup.string()
        .matches(/^\d{4}$/, "OTP must be exactly 4 digits")
        .required("4-digit reset code is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromState = location.state?.email || "";

    const [timer, setTimer] = useState<number>(30);
    const { mutateAsync: resetPasswordMutation, isPending: isResetting } =
        useResetPassword();
    const { mutateAsync: resendCodeMutation, isPending: isResending } =
        useForgotPassword();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleResend = async (currentEmail: string) => {
        const cleanEmail = currentEmail.trim();
        if (!cleanEmail) {
            toast.error("Please enter your email address to resend OTP code");
            return;
        }
        if (timer > 0 || isResending) return;

        try {
            await resendCodeMutation({ email: cleanEmail });
            setTimer(30);
        } catch {
            // Error toast is handled in mutation onError
        }
    };

    const handleSubmit = async (
        values: {
            email: string;
            otp: string;
            password: string;
            confirmPassword: string;
        },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
        try {
            await resetPasswordMutation({
                email: values.email.trim(),
                otp: values.otp.trim(),
                password: values.password,
                confirmPassword: values.confirmPassword,
            });
            navigate("/login", { replace: true });
        } catch {
            // Error toast handled in useResetPassword mutation onError
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-black-900 text-white pt-24 md:pt-32 pb-20 flex flex-col justify-center items-center">
            <Container className="flex flex-col items-center z-10">
                {/* Header */}
                <AuthHeader
                    title="Reset Password"
                    subtitle="Enter the 4-digit code sent to your email along with your new password"
                />

                {/* Form Card Container */}
                <div className="bg-black-700 rounded-lg p-6 sm:p-8 max-w-md w-full border border-neutral-800/60 shadow-2xl mt-6">
                    <Formik
                        initialValues={{
                            email: emailFromState,
                            otp: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={ResetPasswordValidationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ values, isSubmitting }) => {
                            const isLoading = isSubmitting || isResetting;
                            return (
                                <Form className="flex flex-col gap-4">
                                    <CustomInput
                                        name="email"
                                        type="email"
                                        label="EMAIL ADDRESS"
                                        placeholder="Enter Email Address"
                                    />

                                    <div>
                                        <CustomInput
                                            name="otp"
                                            type="text"
                                            label="4-DIGIT RESET CODE"
                                            placeholder="e.g. 1234"
                                            maxLength={4}
                                        />
                                        <div className="flex justify-end mt-1.5">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleResend(values.email)
                                                }
                                                disabled={
                                                    timer > 0 || isResending
                                                }
                                                className="text-xs text-gold-500 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                {isResending
                                                    ? "Resending..."
                                                    : timer > 0
                                                      ? `Resend code in (${timer}s)`
                                                      : "Resend code"}
                                            </button>
                                        </div>
                                    </div>

                                    <CustomInput
                                        name="password"
                                        type="password"
                                        label="NEW PASSWORD"
                                        placeholder="Enter New Password (min. 8 characters)"
                                    />

                                    <CustomInput
                                        name="confirmPassword"
                                        type="password"
                                        label="CONFIRM PASSWORD"
                                        placeholder="Confirm New Password"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full mt-2 h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center font-hanken"
                                    >
                                        {isLoading
                                            ? "Resetting Password..."
                                            : "Reset Password"}
                                    </button>

                                    <div className="text-xs sm:text-sm text-center text-white mt-4 font-hanken">
                                        Remember your password?{" "}
                                        <Link
                                            to="/login"
                                            className="text-gold-500 font-semibold hover:underline"
                                        >
                                            Log In
                                        </Link>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>

                {/* Footer Disclaimer */}
                <AuthFooter />
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

export default ResetPassword;
