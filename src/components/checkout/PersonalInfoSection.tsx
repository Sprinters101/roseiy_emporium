import React from "react";
import { CustomInput } from "@/components/common/CustomInput";

export const PersonalInfoSection: React.FC = () => {
    return (
        <div className="bg-black-700 rounded-sm px-4 py-6 sm:p-8 flex flex-col gap-5 ">
            <h2 className="text-xl sm:text-[1.25rem] font-playfair font-bold text-white mb-1">
                Personal Information
            </h2>

            <CustomInput
                name="fullName"
                label="FULL NAME"
                placeholder="Enter Full Name"
            />

            <CustomInput
                name="phoneNumber"
                type="tel"
                label="PHONE NUMBER"
                placeholder="Enter Phone Number"
            />

            <CustomInput
                name="emailAddress"
                type="email"
                label="EMAIL ADDRESS"
                placeholder="Enter Email Address"
            />
        </div>
    );
};

export default PersonalInfoSection;
