import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AddForm } from "./addform/AddForm";
import { AddForm2 } from "./addform/AddForm2";

import { useAddSiteDataMutation } from "../../redux/site/SiteApiSlice";
import { toast } from "react-toastify";
import { useAddResourceMutation } from "../../redux/resource/ResourceApiSlice";
import BackButton from "../Resource/Utility/BackButton";
import {
  FormBackButton,
  FormNextButton,
} from "../Resource/Utility/FormButtons";
import { log } from "../Resource/Utility/Logger";

export const RadioButtonGroup = ({
  name,
  label,
  options,
  value,
  handleChange,
}) => {
  return (
    <div className="ml-8">
      <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
        {label}
      </h6>
      <div className={`grid grid-cols-3 gap-2 rounded-xl bg-gray-100 p-2`}>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <div>
              {value === option ? (
                <Field
                  type="radio"
                  name={name}
                  id={`${name}-${option}`}
                  value={option}
                  checked={value === option}
                  onChange={handleChange} // Handle input change
                  className="peer hidden"
                />
              ) : (
                <Field
                  type="radio"
                  name={name}
                  id={`${name}-${option}`}
                  value={option}
                  onChange={handleChange} // Handle input change
                  className="peer hidden"
                />
              )}
              <label
                htmlFor={`${name}-${option}`}
                className="block w-20 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-green-400 peer-checked:font-bold peer-checked:text-white"
              >
                {option}
              </label>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
const validationSchema = Yup.object().shape({
  region_id: Yup.string().required("Region is required"),
  woreda_id: Yup.string().required("Wereda is required"),
  kebele_id: Yup.string().required("Kebele is required"),
  site_id: Yup.string().required("Site is required"),
});
export const AddSite = () => {
  const [addSiteData] = useAddSiteDataMutation();
  const [addResource] = useAddResourceMutation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    region: "",
    wereda: "",
    kebele: "",
    microwatershed: "",
    site: "",
    sizeofsite: "",
    file: null,
    indegeneoustype: "",
    exotictype: "",
    landUse: "",
    forage: "",
    livelihoodSupport: "",
  });
  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSubmit = async (values) => {
    const indegeneoustreeArray = [];
    let i = 1;
    while (true) {
      const typeKey = `indegeneoustype${i}`;
      if (values[typeKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "TREE",
          });
          if (response.data) {
            toast.success("Resource added successfully");
            values[typeKey] = response.data.data.id;
          }
        }
        indegeneoustreeArray.push({
          resource_id: values[typeKey],
          indigenous: 1,
        });
        i++;
      } else {
        break;
      }
    }
    const exotictreeArray = [];
    let j = 1;
    while (true) {
      const typeKey = `exotictype${j}`;
      if (values[typeKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "TREE",
          });
          if (response.data) {
            toast.success("Resource added successfully");
            values[typeKey] = response.data.data.id;
          }
        }
        exotictreeArray.push({
          resource_id: values[typeKey],
          indigenous: 0,
        });
        j++;
      } else {
        break;
      }
    }
    const currentlanduseArray = [];
    let k = 1;
    while (true) {
      const typeKey = `currentlanduse${k}`;
      if (values[typeKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "LAND",
          });
          if (response.data) {
            toast.success("Resource added successfully");
            values[typeKey] = response.data.data.id;
          }
        }
        currentlanduseArray.push({
          resource_id: values[typeKey],
          indigenous: 0,
        });
        k++;
      } else {
        break;
      }
    }
    const forageArray = [];
    let l = 1;
    while (true) {
      const typeKey = `forage${l}`;
      if (values[typeKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "FORAGE",
          });
          if (response.data) {
            toast.success("Resource added successfully");
            values[typeKey] = response.data.data.id;
          }
        }
        forageArray.push({
          resource_id: values[typeKey],
          indigenous: 0,
        });
        l++;
      } else {
        break;
      }
    }
    const livelihoodArray = [];
    let m = 1;
    while (true) {
      const typeKey = `livelihood${m}`;
      if (values[typeKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "LIVELIHOOD",
          });
          if (response.data) {
            toast.success("Resource added successfully");
            values[typeKey] = response.data.data.id;
          }
        }
        livelihoodArray.push({
          resource_id: values[typeKey],
          indigenous: 0,
        });
        m++;
      } else {
        break;
      }
    }

    const resource = [
      ...indegeneoustreeArray,
      ...exotictreeArray,
      ...currentlanduseArray,
      ...forageArray,
      ...livelihoodArray,
    ];
    const value = { resource };
    log(value);
    const response = await addSiteData({ ...value, id: values.site_id });
    log(response);
    if (response.data) {
      toast.success("Site added successfully");
      window.location.href = "/admin/site";
    }
  };
  return (
    <div className="bg-dashbordColor">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-lg font-bold mb-5">Add Site Data</h1>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange }) => (
              <Form>
                {step === 1 && (
                  <AddForm
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {step === 2 && (
                  <AddForm2
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                <div className="mt-20 flex justify-between w-10/12 ">
                  {step > 1 && <FormBackButton handleBack={handleBack} />}
                  <div className="text-gray-500 text-sm">Page {step} of 2</div>
                  {step < 2 ? (
                    <FormNextButton handleNext={handleNext} />
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
