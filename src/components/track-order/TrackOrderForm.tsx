import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput } from "@/components/common/CustomInput";

export interface TrackOrderFormValues {
    emailAddress: string;
    orderId: string;
}

export interface TrackOrderFormProps {
    initialValues?: TrackOrderFormValues;
    onTrack: (values: TrackOrderFormValues) => void;
    isLoading?: boolean;
}

const TrackOrderValidationSchema = Yup.object().shape({
    emailAddress: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    orderId: Yup.string().required("Order ID is required"),
});

export const TrackOrderForm: React.FC<TrackOrderFormProps> = ({
    initialValues = { emailAddress: "", orderId: "" },
    onTrack,
    isLoading = false,
}) => {
    return (
        <div className="bg-black-700 rounded-lg p-6 sm:p-8 flex flex-col gap-5 border border-neutral-800/60 shadow-xl mb-10">
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={TrackOrderValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    onTrack(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => {
                    const isPending = isSubmitting || isLoading;
                    return (
                        <Form className="flex flex-col gap-5">
                            <CustomInput
                                name="emailAddress"
                                type="email"
                                label="EMAIL ADDRESS"
                                placeholder="Enter Email Address"
                                disabled={isPending}
                            />

                            <CustomInput
                                name="orderId"
                                label="ORDER ID"
                                placeholder="Enter Order ID"
                                disabled={isPending}
                            />

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full mt-2 h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-hanken"
                            >
                                {isPending ? "Tracking..." : "Track Order"}
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default TrackOrderForm;
