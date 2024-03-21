import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { UpdateForm } from "./updatefrom/UpdateForm";
import { UpdateForm2 } from "./updatefrom/UpdateForm2";
import { UpdateForm3 } from "./updatefrom/UpdateForm3";
import { UpdateForm4 } from "./updatefrom/UpdateForm4";
import { UpdateForm5 } from "./updatefrom/UpdateForm5";
import { UpdateForm6 } from "./updatefrom/UpdateForm6";
import { UpdateForm7 } from "./updatefrom/UpdateForm7";

const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});
export const kebeledata = [
  {
    region: "Amhara",
    wereda: "Dera",
    kebele: "Agar",
    male: 3808,
    female: 3515,
    male2: 100,
    female2: 100,
    types: [
      { type: "Settlement", area: 2.2 },
      { type: "Comminal Grazing", area: 234.6 },
      { type: "Forest", area: 324.96 },
      { type: "Agriculture/Farm land", area: 3148.09 },
      { type: "Bush land", area: 519.36 },
      { type: "Degraded land/Bad land", area: 520 },
    ],
    maleownland: 985,
    femaleownland: 562,
    maledontownland: 0,
    femaledontownland: 0,
    unemployedmale: 0,
    unemployedfemale: 0,
    malecropproduction: 153,
    femalecropproduction: 31,
    malelivestockproduction: 0,
    femalelivestockproduction: 0,
    maledairyproduction: 52,
    femaledairyproduction: 10,
    malebeekeeping: 0,
    femalebeekeeping: 0,
    malelivestockandcropproduction: 760,
    femalelivestockandcropproduction: 153,
    malenonfarmactivites: 20,
    femalenonfarmactivites: 4,
    maleforestseeding: 0,
    femaleforestseeding: 0,
    malepettytrade: 13,
    femalepettytrade: 3,
    maleothers: 23,
    femaleothers: 5,
    oxen: 2627,
    cows: 2789,
    goat: 1305,
    sheep: 2362,
    camel: 0,
    donkey: 1136,
    horse: 35,
    poultry: 4735,
    other: 64,
    Forage: [
      {
        type: "",
        area: 0,
      },
    ],
    crop: [
      {type: "Teff", area: 1101},
      {type: "Maize", area: 472},
      {type: "Dagusa", area: 1574},

    ],
    fruit: [
      {fruittype: "Mango", fruitarea: 14},
      {fruittype: "Avocado", fruitarea: 2},
      {fruittype: "Zeytun", fruitarea: 5},
      {fruittype: "Orange", fruitarea: 3},
      {fruittype: "Banana", fruitarea: 9},
    ],
    typeindegeneous: [
      { typeindegeneous: "Cordia africana" },
      { typeindegeneous: "Croton macrostachyus" },
    ],
    typeexotic: [
      { typeexotic: "Eucalyptus globules" },
      { typeexotic: "Acacia decurrens" },
      { typeexotic: "Cupressus Iusitanica"},
      { typeexotic: "Eucalyptus camaldulensis" },
    ],
    localamount: 0,
    localcap:0,
    communityamt: 0,
    communitycap: 0,
    individualamt: 5,
    individualcap: 150000,
    Cause: [
      {deforestation: "Fuel wood"},
      {deforestation: "Farm land expanstion"},
      {deforestation: "Free grazing"},
    ],
    sourceofenergy: [
      {electricity: "low"},
      {firewood: "high"},
      {animaldung: "high"},
      {cropresidue: "medium"},
      {charcoal: "low"},
      {biogas: "low"},
      {solar: "low"},
    ]
  }, 
];
export const UpdateKebele = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(kebeledata[0]);

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
          <h1 className="text-3xl font-bold mb-5">Update Kebele</h1>
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
              {step === 4 && <UpdateForm4 handleChange={handleChange} />}
              {step === 5 && <UpdateForm5 handleChange={handleChange} />}
              {step === 6 && <UpdateForm6 handleChange={handleChange} />}
              {step === 7 && <UpdateForm7 handleChange={handleChange} />}
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
                <div className="text-gray-500 text-sm">Page {step} of 7</div>
                {step < 7 ? (
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
             )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
