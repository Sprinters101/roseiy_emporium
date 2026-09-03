import React from "react";
import { Link, useNavigate } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@/components/common/Container";
import { CustomInput } from "@/components/common/CustomInput";
import { useRegisterCustomer, type RegisterPayload } from "@/service";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";
import { heroBg } from "@/lib/site_data";

const RegisterValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
    lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
    phoneNumber: Yup.string()
        .min(7, "Please enter a valid phone number")
        .required("Phone number is required"),
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const { mutate: registerCustomer, isPending } = useRegisterCustomer();

    const handleSubmit = (
        values: RegisterPayload,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
        registerCustomer(values, {
            onSuccess: (response) => {
                navigate("/verify-otp", {
                    state: { email: response.data?.email || values.email },
                });
            },
            onSettled: () => {
                setSubmitting(false);
            },
        });
    };

    return (
        <div className="w-full bg-black-900 text-white pt-24 md:pt-32 pb-20 flex flex-col justify-center items-center">
            <Container className="flex flex-col items-center z-10">
                {/* Header */}
                <AuthHeader
                    title="Welcome to Roseiy Emporium"
                    subtitle="Enter your details to sign up."
                />

                {/* Form Card Container */}
                <div className="bg-black-700 rounded-lg p-6 sm:p-8 max-w-md sm:max-w-xl w-full border border-neutral-800/60 shadow-2xl mt-6">
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            phoneNumber: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={RegisterValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => {
                            const isLoading = isSubmitting || isPending;
                            return (
                                <Form className="flex flex-col gap-4">
                                    {/* First Name & Last Name Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <CustomInput
                                            name="firstName"
                                            label="FIRST NAME"
                                            placeholder="Enter First Name"
                                        />
                                        <CustomInput
                                            name="lastName"
                                            label="LAST NAME"
                                            placeholder="Enter Last Name"
                                        />
                                    </div>

                                    <CustomInput
                                        name="phoneNumber"
                                        type="tel"
                                        label="PHONE NUMBER"
                                        placeholder="Enter Phone Number"
                                    />

                                    <CustomInput
                                        name="email"
                                        type="email"
                                        label="EMAIL ADDRESS"
                                        placeholder="Enter Email Address"
                                    />

                                    <CustomInput
                                        name="password"
                                        type="password"
                                        label="PASSWORD"
                                        placeholder="Enter Password"
                                    />

                                    <CustomInput
                                        name="confirmPassword"
                                        type="password"
                                        label="CONFIRM PASSWORD"
                                        placeholder="Confirm Password"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full mt-2 h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center font-hanken"
                                    >
                                        {isLoading ? "Signing Up..." : "Sign Up"}
                                    </button>

                                    <div className="text-xs sm:text-sm text-center text-white mt-4 font-hanken">
                                        Already Have an Account?{" "}
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

export default Register;
