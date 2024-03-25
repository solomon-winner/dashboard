import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UpdateForm } from "./updateform/UpdateForm";
import { UpdateForm2 } from "./updateform/UpdateForm2";
import { UpdateForm3 } from "./updateform/UpdateForm3";
import { useParams } from "react-router-dom";
import {
  useAddWoredaDataMutation,
  useGetWeredaByIdQuery,
} from "../../redux/wereda/WeredaApiSlice";
import { toast } from "react-toastify";
import { useAddResourceMutation } from "../../redux/resource/ResourceApiSlice";
import MainLoading from "../Resource/Loading/MainLoading";
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
      { type: "Settlement/Residential", area: 575.6 },
      { type: "Forest", area: 7670.6 },
      { type: "Agriculture/Farm land", area: 107274.7 },
      { type: "Shrub land", area: 23827.8 },
      { type: "Pastor land/Grazing", area: 9763 },
      { type: "Wetland", area: 50.9 },
      { type: "Degraded land/Bad land", area: 12184.7 },
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
  },
];
export const Updatewereda = () => {
  const { id } = useParams();
  const {
    data: woredadata,
    isSuccess,
    isFetching,
    refetch,
  } = useGetWeredaByIdQuery(id);
  const [addResource] = useAddResourceMutation();
  const [addweredadata] = useAddWoredaDataMutation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({}); // Initialize formData as an empty object

  // Use useEffect to update formData when woredadata is successfully fetched
  useEffect(() => {
    if (isSuccess && woredadata) {// Combine resources and institutions into a single array
      const combined = [
       ...(woredadata.data.woreda_resource.LAND ?? []).map(item => ({ id: item.id, value: item.amount, name: item.value, type: 'LAND' })),
       ...(woredadata.data.woreda_resource.ROAD ?? []).map(item => ({ id: item.id, value: item.amount, name: item.value, type: 'ROAD' })),
       ...(woredadata.data.woreda_institution.SCHOOL ?? []).map(item => ({ id: item.id, value: item.amount, name: item.value, type: 'SCHOOL' })),
       ...(woredadata.data.woreda_institution.HEALTH_FACILITY ?? []).map(item => ({ id: item.id, value: item.amount, name: item.value, type: 'HEALTH_FACILITY' }))
      ];
      
      // Add uniqueId to each item in the combined array
      const combinedWithUniqueId = combined.map((item, index) => ({ uniqeId: index, ...item }));
      
      // Split the combined array back into separate resource and institution arrays
      const resource = combinedWithUniqueId.filter(item => item.type === 'LAND' || item.type === 'ROAD');
      const institution = combinedWithUniqueId.filter(item => item.type === 'SCHOOL' || item.type === 'HEALTH_FACILITY');
       const value = { data: woredadata.data.woreda_data, resource: resource, institution: institution };
       setFormData({...value,id:woredadata.data.id});
       console.log({...value,id:woredadata.data.id});
    }
   }, [isSuccess, woredadata]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    const value = {
      data: values.woreda_data,
      resource: values.woreda_resource,
      institution: values.woreda_institution,
    };
    console.log(value);
    // Check if it's the last step before submitting
    const response = await addweredadata({ ...value, id: values.id });
    console.log(response);
    if (response.data) {
      toast.success("Data Added Successfully");
    } else {
      toast.error(response.error.data.message);
    }
  };
  return (
    <div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Update Wereda Data</h1>
          {isFetching ? (
            <MainLoading />
          ) : Object.keys(formData).length > 0 ? ( // Check if formData is not empty
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
                  {step === 3 && (
                    <UpdateForm3
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  <div className="mt-20 flex justify-between w-10/12">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
                      >
                        Back
                      </button>
                    )}
                    <div className="text-gray-500 text-sm">
                      Page {step} of 3
                    </div>
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
          ) : (
            <p>Loading form data...</p> // Placeholder for when formData is empty
          )}
        </div>
      </div>
    </div>
  );
};
