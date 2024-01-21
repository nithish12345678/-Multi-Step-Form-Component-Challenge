import React, { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

export default function Account({ handleValidationError }) {
    const { userData, setUserData, validateStep } = useStepperContext();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear errors on input change
    };

    const validateFields = () => {
        let validationErrors = {};

        // Username Validation
        if (!userData.username || userData.username.length < 3) {
            validationErrors.username = "Username is required (minimum 3 characters).";
        }

        // Password Validation
        if (!userData.password || userData.password.length < 6) {
            validationErrors.password = "Password is required (minimum 6 characters).";
        }

        // Confirm Password Validation
        if (!userData.confirmPassword || userData.confirmPassword !== userData.password) {
            validationErrors.confirmPassword = "Passwords do not match.";
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
            {/* Username Input */}
            <div className="mx-2 w-full flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                    Username
                </div>
                <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                    <input
                        onChange={handleChange}
                        value={userData["username"] || ""}
                        name="username"
                        placeholder="Username"
                        className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                    />
                </div>
                {errors.username && <span className="text-red-500">{errors.username}</span>}
            </div>

            {/* Password Input */}
            <div className="mx-2 w-full flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                    Password
                </div>
                <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                    <input
                        onChange={handleChange}
                        value={userData["password"] || ""}
                        name="password"
                        placeholder="Password"
                        type="password"
                        className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                    />
                </div>
                {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>

            {/* Confirm Password Input */}
            <div className="mx-2 w-full flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                    Confirm Password
                </div>
                <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                    <input
                        onChange={handleChange}
                        value={userData["confirmPassword"] || ""}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                    />
                </div>
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
            </div>

            {/* Next Button */}
            <button onClick={handleNext} className="mt-4 bg-blue-500 text-white p-2 rounded">
                validate
            </button>
        </div>
    );
}
