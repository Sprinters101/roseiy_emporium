import React from "react";
import { Link, useNavigate } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@/components/common/Container";
import { CustomInput } from "@/components/common/CustomInput";
import { useForgotPassword } from "@/service";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";
import { heroBg } from "@/lib/site_data";

const ForgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
});

export const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const { mutateAsync: forgotPasswordMutation, isPending } =
        useForgotPassword();

    const handleSubmit = async (
        values: { email: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
        const cleanEmail = values.email.trim();
        try {
            await forgotPasswordMutation({ email: cleanEmail });
            navigate("/reset-password", { state: { email: cleanEmail } });
        } catch {
            // Error toast handled in useForgotPassword mutation onError
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-black-900 text-white pt-24 md:pt-32 pb-20 flex flex-col justify-center items-center">
            <Container className="flex flex-col items-center z-10">
                {/* Header */}
                <AuthHeader
                    title="Forgot Password"
                    subtitle="Enter the email associated with your account to reset your password"
                />

                {/* Form Card Container */}
                <div className="bg-black-700 rounded-lg p-6 sm:p-8 max-w-md w-full border border-neutral-800/60 shadow-2xl mt-6">
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={ForgotPasswordValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => {
                            const isLoading = isSubmitting || isPending;
                            return (
                                <Form className="flex flex-col gap-4">
                                    <CustomInput
                                        name="email"
                                        type="email"
                                        label="EMAIL ADDRESS"
                                        placeholder="Enter Email Address"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full mt-2 h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center font-hanken"
                                    >
                                        {isLoading
                                            ? "Sending OTP..."
                                            : "Send OTP"}
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

export default ForgotPassword;
