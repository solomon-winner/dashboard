import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAddSiteDataMutation } from "../../redux/site/SiteApiSlice";
import { toast } from "react-toastify";
import { useAddResourceMutation } from "../../redux/resource/ResourceApiSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useInitialValueSite } from "../../redux/InitialState/initalValueSite";
import { useSelector } from "react-redux";
import { MainLoading } from "../Resource/Loading/Loadings";
import { UpdateForm2 } from "./updateform/UpdateForm2";
import { UpdateForm } from "./updateform/UpdateForm";
import BackButton from "../Resource/Utility/BackButton";
import {
  FormBackButton,
  FormNextButton,
} from "../Resource/Utility/FormButtons";
import { log } from "../Resource/Utility/Logger";
const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});
export const UpdateSite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  useInitialValueSite(id);
  const { siteData, loading } = useSelector((state) => state.siteById);
  const [addSiteData] = useAddSiteDataMutation();
  const [addResource] = useAddResourceMutation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(siteData);

  useEffect(() => {
    if (!id) {
      navigate('/admin/site'); // Redirect if no ID is provided
    }
  }, [id, navigate]);
  useEffect(() => {
    if (!loading && siteData) {
      setFormData(siteData);
      log(siteData);
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
    setIsSubmitting(true);
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
            resource_type: "LIVELIHOOD",
          });
          if (response.data) {
           
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
    try {
    const response = await addSiteData({ ...value, id });
    log(response);
    if (response.data) {
      toast.success("Site added successfully");
      navigate(`/admin/site/details`,{ state: { id: id } });
      window.location.reload();
      // window.history.back();
   
    }
  } catch (error) {
    log.error(error);
    // Handle error (e.g., show a notification)
  } finally {
    setIsSubmitting(false); // End submission
  }
  };
  return (
    <div className="bg-dashbordColor min-h-screen">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-lg font-bold mb-5">Update Site Data</h1>
          {loading === true ? (
            <MainLoading />
          ) : (
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
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
                    {step > 1 && <FormBackButton handleBack={handleBack} />}
                    <div className="text-gray-500 text-sm">
                      Page {step} of 2
                    </div>
                    {step < 2 ? (
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
          )}
        </div>
      </div>
    </div>
  );
};
