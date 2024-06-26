import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AddForm } from "./addform/AddForm";
import { AddForm2 } from "./addform/AddForm2";
import { AddForm3 } from "./addform/AddForm3";

import { useAddWoredaDataMutation } from "../../redux/wereda/WeredaApiSlice";
import { toast } from "react-toastify";
import { useAddResourceMutation } from "../../redux/resource/ResourceApiSlice";
import BackButton from "../Resource/Utility/BackButton";
import {
  FormBackButton,
  FormNextButton,
} from "../Resource/Utility/FormButtons";
import { log } from "../Resource/Utility/Logger";
import { useAddInstitutionMutation } from "../../redux/institutions/InstitutionsApislice";
const validationSchema = Yup.object().shape({
  region_id: Yup.string().required("Region is required"),
  woreda_id: Yup.string().required("Wereda is required"),
});

export const Addwereda = () => {
  const [addResource] = useAddResourceMutation();
  const [addInstution] = useAddInstitutionMutation();
  const [step, setStep] = useState(1);
  const [addweredadata] = useAddWoredaDataMutation();
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const [formData, setFormData] = useState({
    region_id: "",
    woreda_id: "",
    selectedRegionName: "",
    selectedWeredaName: "",
    urban_kebeles: "",
    rural_kebeles: "",
    male_hh: "",
    female_hh: "",
    male_population: "",
    female_population: "",
    type1: "",
    area1: "",
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

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    log(values);
    const landArray = [];
    let i = 1;
    while (true) {
      const typeKey = `type${i}`;
      const areaKey = `area${i}`;
      if (values[typeKey] && values[areaKey]) {
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
        landArray.push({
          resource_id: values[typeKey],
          amount: values[areaKey],
        });
        i++;
      } else {
        break;
      }
    }
    const roadArray = [];
    let j = 1;
    while (true) {
      const typeKey = `roadtype${j}`;
      const areaKey = `distance${j}`;
      if (values[typeKey] && values[areaKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "ROAD",
          });
          if (response.data) {
            toast.success("Resource added successfully");
            values[typeKey] = response.data.data.id;
          }
        }
        roadArray.push({
          resource_id: values[typeKey],
          amount: values[areaKey],
        });
        j++;
      } else {
        break;
      }
    }
    const schoolArray = [];
    let k = 1;
    while (true) {
      const typeKey = `schooltype${k}`;
      const areaKey = `schoolnumber${k}`;
      if (values[typeKey] && values[areaKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addInstution({
            name: values[typeKey],
            institution_type: "SCHOOL",
          });
          if (response.data) {
            toast.success("Institution added successfully");
            values[typeKey] = response.data.data.id;
          }
        }
        schoolArray.push({
          institution_id: values[typeKey],
          amount: values[areaKey],
        });
        k++;
      } else {
        break;
      }
    }
    const healthArray = [];
    let l = 1;
    while (true) {
      const typeKey = `healthFacilitytype${l}`;
      const areaKey = `healthFacilitynumber${l}`;
      if (values[typeKey] && values[areaKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addInstution({
            name: values[typeKey],
            institution_type: "HEALTH_FACILITY",
          });
          if (response.data) {
            toast.success("Institution added successfully");
            values[typeKey] = response.data.data.id;
          }
        }
        healthArray.push({
          institution_id: values[typeKey],
          amount: values[areaKey],
        });
        l++;
      } else {
        break;
      }
    }

    const institution = [...schoolArray, ...healthArray];
    const resource = [...landArray, ...roadArray];
    const urban_kebeles = values.urban_kebeles;
    const rural_kebeles = values.rural_kebeles;
    const male_hh = values.male_hh;
    const female_hh = values.female_hh;
    const male_population = values.male_population;
    const female_population = values.female_population;

    // Create a new object to store these values
    const data = {
      urban_kebeles,
      rural_kebeles,
      male_hh,
      female_hh,
      male_population,
      female_population,
    };
    const value = {
      resource,
      data,
      institution,
    };

    log(value);
    try {
    // Check if it's the last step before submitting
    const response = await addweredadata({ ...value, id: values.woreda_id });
    log(response);
    if (response.data) {
      toast.success("Data Added Successfully");
      window.location.href = `/admin/wereda`;
    }
  } catch (error) {
    log.error(error);
    // Handle error (e.g., show a notification)
  } finally {
    setIsSubmitting(false); // End submission
  }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-dashbordColor min-h-screen">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-lg font-bold mb-5">Add Wereda Data</h1>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
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
                {step === 3 && (
                  <AddForm3
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                <div className="mt-20 flex justify-between w-10/12">
                  {step > 1 && <FormBackButton handleBack={handleBack} />}
                  <div className="text-gray-500 text-sm">Page {step} of 3</div>
                  {step < 3 ? (
                    <FormNextButton handleNext={handleNext} />
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
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
