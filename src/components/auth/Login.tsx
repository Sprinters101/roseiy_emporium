import React from "react";
import { Link, useNavigate } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@/components/common/Container";
import { CustomInput } from "@/components/common/CustomInput";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";
import { heroBg } from "@/lib/site_data";

const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (
        values: { email: string; password: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            login("mock_token_rosiey_emporium_2026", { email: values.email });
            toast.success("Logged in successfully!");
            navigate("/");
        } catch {
            toast.error("Invalid email or password. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full   text-white pt-24 md:pt-32 pb-20 flex flex-col justify-center items-center">
            <Container className="flex flex-col items-center z-10">
                {/* Header */}
                <AuthHeader
                    title="Welcome to Roseiy Emporium"
                    subtitle="Enter your details to Log In"
                />

                {/* Form Card Container */}
                <div className="bg-black-700 rounded-lg p-6 sm:p-8 max-w-md w-full border border-neutral-800/60 shadow-2xl mt-6">
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={LoginValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col gap-4">
                                <CustomInput
                                    name="email"
                                    type="email"
                                    label="EMAIL ADDRESS"
                                    placeholder="Enter Email Address"
                                />

                                <div>
                                    <CustomInput
                                        name="password"
                                        type="password"
                                        label="PASSWORD"
                                        placeholder="Enter Password"
                                    />
                                    <div className="text-right mt-1.5">
                                        <Link
                                            to="/forgot-password"
                                            className="text-gold-500 text-xs font-semibold hover:underline inline-block"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center font-hanken"
                                >
                                    {isSubmitting ? "Logging In..." : "Log In"}
                                </button>

                                <div className="text-xs sm:text-sm text-center text-white mt-4 font-hanken">
                                    Don't Have an Account?{" "}
                                    <Link
                                        to="/register"
                                        className="text-gold-500 font-semibold hover:underline"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </Form>
                        )}
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

export default Login;
