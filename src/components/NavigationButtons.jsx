import React from "react";

export default function NavigationButtons({ handleClick, currentStep, steps, validationErrors, show }) {
    const isNextDisabled = validationErrors && Object.keys(validationErrors).length > 0;

    return (
        <div className="container mt-4 mb-8 flex justify-around">
            <button
                onClick={() => handleClick("back")}
                className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white ${currentStep === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
            >
                Back
            </button>

            {show && <button
                onClick={() => handleClick("next")}
                className={`cursor-pointer rounded-lg bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white ${isNextDisabled ? "cursor-not-allowed opacity-50" : ""
                    }`}
                disabled={isNextDisabled}
            >
                {currentStep === steps.length - 1 ? "Confirm" : "Next"}
            </button>}
        </div>
    );
}
