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
}) => {
    return (
        <div className="bg-black-700 rounded-lg p-6 sm:p-8 flex flex-col gap-5 border border-neutral-800/60 shadow-xl">
            <Formik
                initialValues={initialValues}
                validationSchema={TrackOrderValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    onTrack(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">
                        <CustomInput
                            name="emailAddress"
                            type="email"
                            label="EMAIL ADDRESS"
                            placeholder="Enter Email Address"
                        />

                        <CustomInput
                            name="orderId"
                            label="ORDER ID"
                            placeholder="Enter Order ID"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-2 h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center"
                        >
                            {isSubmitting ? "Tracking..." : "Track Order"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TrackOrderForm;
