import React, { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

export default function Address({ handleValidationError }) {
    const { userData, setUserData, validateStep } = useStepperContext();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear errors on input change
    };

    const validateFields = () => {
        let validationErrors = {};

        // Street Address Validation
        if (!userData.streetAddress || userData.streetAddress.length < 5) {
            validationErrors.streetAddress = "Street Address is required (minimum 5 characters).";
        }

        // City Validation
        if (!userData.city || userData.city.length < 3) {
            validationErrors.city = "City is required (minimum 3 characters).";
        }

        // State Validation
        if (!userData.state) {
            validationErrors.state = "State is required.";
        }

        // Zip Code Validation
        const zipRegex = /^\d+$/;
        if (!userData.zipCode || !zipRegex.test(userData.zipCode)) {
            validationErrors.zipCode = "Enter a valid numeric Zip Code.";
        }

        setErrors(validationErrors);
        handleValidationError(validationErrors);
        return Object.keys(validationErrors).length === 0; // Returns true if no errors
    };

    const handleNext = () => {
        if (validateFields()) {
            // Move to the next step
        }
    };

    return (
        <div className="flex flex-col ">
            {/* Street Address Input */}
            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    Street Address
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input
                        onChange={handleChange}
                        value={userData["streetAddress"] || ""}
                        name="streetAddress"
                        placeholder="Street Address"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>
                {errors.streetAddress && <span className="text-red-500">{errors.streetAddress}</span>}
            </div>

            {/* City Input */}
            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    City
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input
                        onChange={handleChange}
                        value={userData["city"] || ""}
                        name="city"
                        placeholder="City"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>
                {errors.city && <span className="text-red-500">{errors.city}</span>}
            </div>

            {/* City Input */}
            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    state
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input
                        onChange={handleChange}
                        value={userData["state"] || ""}
                        name="state"
                        placeholder="state"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>
                {errors.state && <span className="text-red-500">{errors.state}</span>}
            </div>

            {/* Zip Code Input */}
            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    Zip Code
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input
                        onChange={handleChange}
                        value={userData["zipCode"] || ""}
                        name="zipCode"
                        placeholder="Zip Code"
                        type="number"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>
                {errors.zipCode && <span className="text-red-500">{errors.zipCode}</span>}
            </div>

            {/* Next Button */}
            <button onClick={handleNext} className="mt-4 bg-blue-500 text-white p-2 rounded">
                validate
            </button>

        </div>
    );
}
