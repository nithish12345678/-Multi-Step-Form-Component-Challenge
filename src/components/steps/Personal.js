import React, { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

export default function Personal({ handleValidationError }) {
    const { userData, setUserData, validateStep } = useStepperContext();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear errors on input change
    };

    const validateFields = () => {
        let validationErrors = {};

        // Full Name Validation
        if (!userData.fullName || userData.fullName.length < 3) {
            validationErrors.fullName = "Full Name is required (minimum 3 characters).";
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userData.email || !emailRegex.test(userData.email)) {
            validationErrors.email = "Enter a valid email address.";
        }

        // Date of Birth Validation
        if (!userData.dob) {
            validationErrors.dob = "Date of Birth is required.";
        }

        setErrors(validationErrors);
        handleValidationError(validationErrors);
        return Object.keys(validationErrors).length === 0; // Returns true if no errors
    };

    const handleNext = () => {
        if (validateFields()) {

        }
    };

    return (
        <div className="flex flex-col">
            {/* Full Name Input */}
            <div className="mx-2 w-full flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                    Full Name
                </div>
                <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                    <input
                        onChange={handleChange}
                        value={userData["fullName"] || ""}
                        name="fullName"
                        placeholder="Full Name"
                        className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                    />
                </div>
                {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
            </div>

            {/* Email Address Input */}
            <div className="mx-2 w-full flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                    Email Address
                </div>
                <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                    <input
                        onChange={handleChange}
                        value={userData["email"] || ""}
                        name="email"
                        placeholder="Email Address"
                        type="email"
                        className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                    />
                </div>
                {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

            {/* Date of Birth Input */}
            <div className="mx-2 w-full flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                    Date of Birth
                </div>
                <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                    <input
                        onChange={handleChange}
                        value={userData["dob"] || ""}
                        name="dob"
                        placeholder="Date of Birth"
                        type="date"
                        className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                    />
                </div>
                {errors.dob && <span className="text-red-500">{errors.dob}</span>}
            </div>

            {/* Next Button */}
            <button onClick={handleNext} className="mt-4 bg-blue-500 text-white p-2 rounded">
                validate
            </button>
        </div>
    );
}
