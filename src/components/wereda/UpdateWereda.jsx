import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
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
import { MainLoading } from "../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import { useInitalValueworeda } from "../../redux/InitialState/initalValueWoreda";
import BackButton from "../Resource/Utility/BackButton";
import {
  FormBackButton,
  FormNextButton,
} from "../Resource/Utility/FormButtons";
const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});
export const Updatewereda = () => {
  const { id } = useParams();
  useInitalValueworeda(id);
  const { data: woredadata, isFetching } = useGetWeredaByIdQuery(id);
  const { weredas, isLoadingWeredas } = useSelector((state) => state.wereda);
  const [addResource] = useAddResourceMutation();
  const [addweredadata] = useAddWoredaDataMutation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(weredas); // Initialize formData as an empty object

  // Use useEffect to update formData when woredadata is successfully fetched
  useEffect(() => {
    if (!isLoadingWeredas && weredas) {
      setFormData(weredas);
    }
  }, [!isLoadingWeredas]);

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
      // window.location.href = `/admin/wereda`;
      window.history.back();
    }
  };
  return (
    <div className="bg-dashbordColor">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
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
                    {step > 1 && <FormBackButton handleBack={handleBack} />}
                    <div className="text-gray-500 text-sm">
                      Page {step} of 3
                    </div>
                    {step < 3 ? (
                      <FormNextButton handleNext={handleNext} />
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
