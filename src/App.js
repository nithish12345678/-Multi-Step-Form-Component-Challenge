import { useState } from "react";
import Stepper from "./components/Stepper";
import StepperControl from "./components/NavigationButtons";
import { UseContextProvider } from "./contexts/StepperContext";

import Account from "./components/steps/Account";
import Personal from "./components/steps/Personal";
import Address from "./components/steps/Address";
import Final from "./components/steps/Final";


function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [show, setShow] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const steps = [
    "Personal Details",
    "Address",
    "Account Information",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Personal handleValidationError={handleValidationError} />;
      case 2:
        return <Address handleValidationError={handleValidationError} />;
      case 3:
        return <Account handleValidationError={handleValidationError} />;
      case 4:
        return <Final handleValidationError={handleValidationError} />;
      default:
        return null;
    }
  };

  const handleClick = (direction) => {

    let newStep = currentStep;

    direction === "next" ? (newStep += 1) : (newStep -= 1);

    // check if steps are within bounds
    setShow(false)
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

  };

  const handleValidationError = (error) => {
    setShow(true);

    setValidationErrors(error);

  };




  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>
            {displayStep(currentStep)}
          </UseContextProvider>
        </div>
      </div>

      {/* Navigation buttons */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          validationErrors={validationErrors}
          steps={steps}
          show={show}
        />
      )}
    </div>
  );
}

export default App;
