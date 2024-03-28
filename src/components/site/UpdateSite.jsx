import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { UpdateForm } from "./updateform/UpdateForm";
import { UpdateForm2 } from "./updateform/UpdateForm2";
import { UpdateForm3 } from "./updateform/UpdateForm3";

const validationSchema = Yup.object().shape({
    // Define your validation schema here if needed
  });
  export const sitedata = [
    {
      region: "Amhara",
      wereda: "Dera",
      kebele: "Agar",
      microwatershed: "Agar Wenz",
      site: "Agar Jefefa",
      sizeofsite: 9.6,
      typeindegeneous: [
        { type: "C. africana" },
        { type: "O. africana" },
        { type: "R. prinoides"},
        { type: "C. macrstachyus" },
        { type: "C. tomentosa" },
        { type: "M. ferruginea (Birbira)" },
        { type: "J. procera" },
      ],
      typeexotic: [
        { type: "A. decurrens" },
        { type: "G. robusta" },
        { type: "C. lustanica"},
        { type: "C. equisetifolia" },
        { type: "S. sesban" },
      ],
      settlement: "No",
      communalgrazing: "Yes",
      forest: "No",
      agriculturalfarmland: "No",
      shrubland: "No",
      bushland: "No",
      pastorlandgrazing: "No",
      wetland: "No",
      degradedlandbadland: "Yes",
      irrigationland: "No",
      bareland: "No",
      other: "No",
      forage: [
        { forage: "Grass" },
        { forage: "Trulucern" },
        { forage: "Suspania" },
        { forage: "Elephant grass" },
      ],
      livestockSupport: [
        { cropproduction: "No" },
        { livestockproduction: "No" },
        { dairyproduction: "No" },
        { beekeeping: "No" },
        { livestockandcropproduction: "No" },
        { nonfarmactivities: "No" },
        { forestseeding: "No" },
        { pettytrade: "No" },
        { smallruminant: "No" },
        { poultry: "No" },
        { foragegrowing: "Yes" },
        { other: "No"}
      ]
    }
  ]
  export const UpdateSite = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(sitedata[0]);
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
              <h1 className="text-3xl font-bold mb-5">Update Site</h1>
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
        