import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AddForm } from "./addform/AddForm";
import { AddForm2 } from "./addform/AddForm2";
import { AddForm3 } from "./addform/AddForm3";
import { useAddSiteDataMutation } from "../../redux/site/SiteApiSlice";
import { toast } from "react-toastify";
import { useAddResourceMutation } from "../../redux/resource/ResourceApiSlice";
import { useParams } from "react-router-dom";
import { useInitialValueSite } from "../../redux/InitialState/initalValueSite";
import { useDispatch, useSelector } from "react-redux";
import { MainLoading } from "../Resource/Loading/Loadings";
import { UpdateForm2 } from "./updateform/UpdateForm2";
import { UpdateForm } from "./updateform/UpdateForm";
import {
  setLoadingFalse,
  setLoadingTrue,
} from "../../redux/site/SiteByIdState";
import BackButton from "../Resource/Utility/BackButton";
import { FormBackButton, FormNextButton } from "../Resource/Utility/FormButtons";
const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});
export const UpdateSite = () => {
  const { id } = useParams();
  useInitialValueSite(id);
  const { siteData, loading } = useSelector((state) => state.siteById);
  const [addSiteData] = useAddSiteDataMutation();
  const [addResource] = useAddResourceMutation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(siteData);
  useEffect(() => {
    if (!loading && siteData) {
      setFormData(siteData);
    }
  }, [!loading]);
  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSubmit = async (values) => {
    console.log(values);
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
      const typeKey = `currentlandusetype${k}`;
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
      const typeKey = `foragetype${l}`;
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
      const typeKey = `livelihoodtype${m}`;
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
    console.log(value);
    const response = await addSiteData({ ...value, id });
    console.log(response);
    if (response.data) {
      toast.success("Site added successfully");
    }
  };
  return (
    <div className="bg-dashbordColor">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Update Site Data</h1>
          {loading === true ? (
            <MainLoading />
          ) : (
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ handleChange }) => (
                <Form>
                  {step === 1 && (
                    <UpdateForm
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {step === 2 && (
                    <UpdateForm2
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  <div className="mt-20 flex justify-between w-10/12 ">
                    {step > 1 && (
                      <FormBackButton handleBack={handleBack}/>
                    )}
                    <div className="text-gray-500 text-sm">
                      Page {step} of 2
                    </div>
                    {step < 2 ? (
                     <FormNextButton handleNext={handleNext}/>
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
          )}
        </div>
      </div>
    </div>
  );
};
