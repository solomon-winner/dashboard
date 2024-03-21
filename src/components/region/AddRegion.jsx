import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AddForm } from "./addform/AddForm";
import { AddForm2 } from "./addform/AddForm2";
import { AddForm3 } from "./addform/AddForm3";

const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});

export const AddRegion = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    region: "",
    wereda: "",
    urban: "",
    rural: "",
    male: "",
    female: "",
    male2: "",
    female2: "",
    type: "",
    area: "",
    asphalt: "",
    allseasongravel: "",
    seasonalgravel: "",
    college: "",
    tvet: "",
    highschool: "",
    secoundschool: "",
    primary: "",
    general: "",
    referral: "",
    clinic: "",
    vetclinic: "",
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Add Region</h1>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {step === 1 && <AddForm />}
              {step === 2 && <AddForm2 />}
              {step === 3 && <AddForm3 />}
              <div className="mt-4 flex justify-between w-10/12">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
                  >
                    Back
                  </button>
                )}
                 <div className="text-gray-500 text-sm">Page {step} of 3</div>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
                  >
                    Submit
                  </button>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
