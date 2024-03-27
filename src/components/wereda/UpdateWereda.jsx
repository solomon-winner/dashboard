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
    if (isSuccess && woredadata) {
      const woredaData = woredadata?.data;
      const urban_kebeles = woredaData?.woreda_data?.urban_kebeles;
      const rural_kebeles = woredaData?.woreda_data?.rural_kebeles;
      const male_hh = woredaData?.woreda_data?.male_hh;
      const female_hh = woredaData?.woreda_data?.female_hh;
      const male_population = woredaData?.woreda_data?.male_population;
      const female_population = woredaData?.woreda_data?.female_population;
      const landResource = woredaData?.woreda_resource?.LAND ? woredaData.woreda_resource.LAND.map(
        (item, index) => ({
           [`type${index + 1}`]: item.id,
           [`area${index + 1}`]: item.amount,
        })
       ) : [];
      const roadResource = woredaData?.woreda_resource?.ROAD ? woredaData.woreda_resource.ROAD.map((item, index)=>({
         [`roadtype${index + 1}`]: item.id,
         [`distance${index + 1}`]: item.amount
      })
      ):[]; 
      const schoolResource = woredaData?.woreda_institution?.SCHOOL ? woredaData.woreda_institution.SCHOOL.map(
        (item, index) => ({
          [`schooltype${index + 1}`]: item.id,
          [`schoolnumber${index + 1}`]: item.amount,
        })
      ):[];
      const healthResource = woredaData?.woreda_institution?.HEALTH_FACILITY ? woredaData.woreda_institution.HEALTH_FACILITY.map(
        (item, index) => ({
          [`healthFacilitytype${index + 1}`]: item.id,
          [`healthFacilitynumber${index + 1}`]: item.amount,
        })
      ):[];
      
      setFormData({
        urban_kebeles,
        rural_kebeles,
        male_hh,
        female_hh,
        male_population,
        female_population,
        ...landResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...roadResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...schoolResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...healthResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        id: woredadata.data.id,
      });
      console.log({
        urban_kebeles,
        rural_kebeles,
        male_hh,
        female_hh,
        male_population,
        female_population,
        ...landResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...roadResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...schoolResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...healthResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        id: woredadata.data.id,
      });
    }
  }, [isSuccess, woredadata]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (values) => {
    console.log(values);
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
          } else {
            toast.error(response.error.data.message);
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
          } else {
            toast.error(response.error.data.message);
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

    console.log(value);
  
    const response = await addweredadata({ ...value, id });
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
