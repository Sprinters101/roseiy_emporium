import React from "react";
import { Link } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { FaInstagram, FaSnapchatGhost } from "react-icons/fa";
import { Hero } from "@/components/common/Hero";
import Container from "@/components/common/Container";
import { CustomInput } from "@/components/common/CustomInput";
import { toast } from "@/components/ui/sonner";

const ContactValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Full name is required"),
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    phone: Yup.string().optional(),
    message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
});

export const ContactUs: React.FC = () => {
    const handleSubmit = async (
        _values: {
            fullName: string;
            email: string;
            phone?: string;
            message: string;
        },
        { resetForm }: { resetForm: () => void },
    ) => {
        try {
            // Simulate API request delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            toast.success("Your message has been sent successfully!");
            resetForm();
        } catch (error) {
            toast.error("Failed to send your message. Please try again later.");
        }
    };

    return (
        <div className="w-full bg-black-900 min-h-screen text-white pb-20">
            {/* Hero Section */}
            <Hero
                title="Get In Touch"
                subtitle="Whether you're searching for the perfect bottle, need assistance with an order, or have a question about our collection, our team is ready to assist."
            />

            <Container className="pt-8 md:pt-12">
                {/* Breadcrumbs */}
                <>
                    <div className="">
                        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-hanken mb-1">
                            <Link
                                to="/"
                                className="hover:text-white transition-colors"
                            >
                                HOME
                            </Link>
                            <ChevronRight className="size-3.5" />
                            <span className="text-gold-500  font-medium">
                                CONTACT US
                            </span>
                        </div>
                    </div>
                    {/* Page Header */}
                    <h1 className="text-3xl md:text-hg-b2 font-playfair font-bold text-white tracking-tight uppercase mb-8 sm:mb-12">
                        CONTACT US
                    </h1>
                </>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Get In Touch Details */}
                    <div className="lg:col-span-5 bg-black-700  rounded-lg p-6 sm:p-8  h-fit ">
                        <div>
                            <h2 className="text-xl sm:text-[1.25rem] font-playfair font-bold text-white mb-8">
                                Get In Touch
                            </h2>

                            {/* Contact Items */}
                            <div className="flex flex-col gap-6">
                                {/* Phone Item */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-full bg-black-900  flex items-center justify-center text-white shrink-0 mt-0.5">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="">
                                        <span className="text-xs md:text-base text-white font-medium uppercase tracking-wider block">
                                            Call Us On
                                        </span>
                                        <a
                                            href="tel:+2348156664737"
                                            className="text-sm sm:text-base md:text-[1.25rem] font-bold gradient-text hover:underline mt-0.5 inline-block leading-relaxed"
                                        >
                                            +2348156664737
                                        </a>
                                        <span className="gradient-text text-sm sm:text-base md:text-[1.25rem]">
                                            {" "}
                                            &amp;{" "}
                                        </span>
                                        <a
                                            href="tel:+447946301028"
                                            className="text-sm sm:text-base md:text-[1.25rem] font-bold gradient-text hover:underline mt-0.5 inline-block leading-relaxed"
                                        >
                                            +447946301028
                                        </a>
                                    </div>
                                </div>

                                {/* Email Item */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-full bg-black-900  flex items-center justify-center text-white shrink-0 mt-0.5">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs md:text-base text-white font-medium uppercase tracking-wider block">
                                            Email Us
                                        </span>
                                        <a
                                            href="mailto:omobolajrose@gmail.com"
                                            className="text-sm sm:text-base md:text-[1.25rem] font-bold gradient-text hover:underline mt-0.5 block"
                                        >
                                            omobolajrose@gmail.com
                                        </a>
                                    </div>
                                </div>

                                {/* Address Item */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-full bg-black-900  flex items-center justify-center text-white shrink-0 mt-0.5">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs md:text-base text-white font-medium uppercase tracking-wider block">
                                            Visit Us at
                                        </span>
                                        <p className="text-sm sm:text-base md:text-[1.25rem] font-bold gradient-text mt-0.5 leading-snug">
                                            16 pinnock beach road ajiran , lekki
                                            , Lagos
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Follow */}
                        <div className="mt-10  ">
                            <h3 className="text-lg md:text-[1.25rem] font-playfair font-bold text-white mb-4">
                                Follow Us
                            </h3>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-black-900  flex items-center justify-center text-zinc-300 hover:text-gold-500 hover:border-gold-500 transition-all duration-200"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://snapchat.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-black-900  flex items-center justify-center text-zinc-300 hover:text-gold-500 hover:border-gold-500 transition-all duration-200"
                                    aria-label="Snapchat"
                                >
                                    <FaSnapchatGhost className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Formik Send Us a Message Form */}
                    <div className="lg:col-span-7 bg-black-700 rounded-lg p-6 sm:p-8 ">
                        <h2 className="text-xl sm:text-[1.25rem] font-playfair font-bold text-white mb-4 md:mb-8">
                            Send Us a Message
                        </h2>

                        <Formik
                            initialValues={{
                                fullName: "",
                                email: "",
                                phone: "",
                                message: "",
                            }}
                            validationSchema={ContactValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-5">
                                    <CustomInput
                                        name="fullName"
                                        label="FULL NAME"
                                        placeholder="Enter Full Name"
                                    />

                                    <CustomInput
                                        name="email"
                                        type="email"
                                        label="EMAIL ADDRESS"
                                        placeholder="Enter Email Address"
                                    />

                                    <CustomInput
                                        name="phone"
                                        type="tel"
                                        label="PHONE NUMBER (Optional)"
                                        placeholder="Enter Phone Number"
                                    />

                                    <CustomInput
                                        name="message"
                                        isTextArea
                                        rows={4}
                                        label="MESSAGE"
                                        placeholder="Enter your message......"
                                        className="h-31.25"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-10 md:h-12 mt-2 bg-gold-g hover:opacity-95 text-black font-semibold text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isSubmitting
                                            ? "Sending Message..."
                                            : "Send Message"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ContactUs;
