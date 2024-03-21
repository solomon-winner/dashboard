import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UpdateForm } from "./updateform/UpdateForm";
import { UpdateForm2 } from "./updateform/UpdateForm2";
import { UpdateForm3 } from "./updateform/UpdateForm3";

const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});
export const weredadata = [
  {
    region: "Amhara",
    wereda: "Dera",
    urban: 2,
    rural: 35,
    male: 164586,
    female: 151711,
    male2: 0,
    female2: 0,
    types: [
      { type: "Settlement/Residential", area:  575.6 },
      { type: "Forest", area:  7670.6 },
      { type: "Agriculture/Farm land", area:  107274.7 },
      { type: "Shrub land", area:  23827.8 },
      { type: "Pastor land/Grazing", area:  9763 },
      { type: "Wetland", area:  50.9 },
      { type: "Degraded land/Bad land", area:  12184.7 },
    ],
    asphalt: 59,
    allseasongravel: 113,
    seasonalgravel: 42,
    college: 0,
    tvet: 1,
    highschool: 0,
    secoundschool: 5,
    primaryschool: 112,
    primary: 1,
    general: 0,
    referral: 0,
    healthcenter: 11,
    clinic: 42,
    vetclinic: 32,
  }
]
// export const FormField = ({ label, name, type, placeholder,icon: Icon }) => (
//   <div class="w-full lg:w-2/5 px-4">
//     <div className="relative w-full mb-3">
//       <label
//         className="block uppercase text-gray-500 text-xs font-bold mb-2"
//         htmlFor={name}
//       >
//         {label}
//       </label>
//       <div className="flex items-center border border-gray-300 rounded px-3 py-2">
//         {Icon && <Icon className="text-gray-400 mr-2" />}
//         <Field
//           type={type}
//           id={name}
//           name={name}
//           className="border-0 px-3 py-1 text-sm focus:outline-none w-full bg-transparent"
//           placeholder={placeholder}
//         />
//       </div>
//       <ErrorMessage
//         name={name}
//         component="div"
//         className="text-red-500 flex items-start"
//       />
//     </div>
//   </div>
// );
export const Updatewereda = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(weredadata[0]);

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
          <h1 className="text-3xl font-bold mb-5">Update Wereda Data</h1>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
             {({ handleChange }) => (
            <Form>
              {step === 1 && <UpdateForm handleChange={handleChange} />}
              {step === 2 && <UpdateForm2 handleChange={handleChange} />}
              {step === 3 && <UpdateForm3 handleChange={handleChange} />}
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
                    Update
                  </button>
                )}
              </div>
            </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
