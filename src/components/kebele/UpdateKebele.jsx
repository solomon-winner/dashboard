import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { UpdateForm } from "./updatefrom/UpdateForm";
import { UpdateForm2 } from "./updatefrom/UpdateForm2";
import { UpdateForm3 } from "./updatefrom/UpdateForm3";
import { UpdateForm4 } from "./updatefrom/UpdateForm4";
import { UpdateForm5 } from "./updatefrom/UpdateForm5";
import { UpdateForm6 } from "./updatefrom/UpdateForm6";
import { UpdateForm7 } from "./updatefrom/UpdateForm7";
import { useAddResourceMutation } from "../../redux/resource/ResourceApiSlice";
import {
  useAddKebeleDataMutation,
  useGetKebeleByIdQuery,
} from "../../redux/kebele/KebeleApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MainLoading } from "../Resource/Loading/Loadings";
import { useInitialValueKebele } from "../../redux/InitialState/initalValueKebele";
import { useSelector } from "react-redux";
import BackButton from "../Resource/Utility/BackButton";
import {
  FormBackButton,
  FormNextButton,
} from "../Resource/Utility/FormButtons";
import { log } from "../Resource/Utility/Logger";

const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});
export const UpdateKebele = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  useInitialValueKebele(id);
  const { kebeleData, loading } = useSelector((state) => state.kebeleById);
  const [addResource] = useAddResourceMutation();
  const [AddKebeleData] = useAddKebeleDataMutation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(kebeleData);
  useEffect(() => {
    if (!id) {
      navigate('/admin/kebele'); // Redirect if no ID is provided
    }
  }, [id, navigate]);
  useEffect(() => {
    if (!loading && kebeleData) {
      setFormData(kebeleData);
    }
  }, [kebeleData]);
  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const energy_sourceArray = [];
    let i = 1;
    while (true) {
      const typeKey = `energy_sourcetype${i}`;
      const energyKey = `energy_sourcelevel${i}`;
      if (values[typeKey] && values[energyKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "ENERGY_SOURCE",
          });
          if (response.data) {
           
            values[typeKey] = response.data.data.id;
          }
        }
        energy_sourceArray.push({
          resource_id: values[typeKey],
          access_level: values[energyKey],
        });
        i++;
      } else {
        break;
      }
    }

    const livelihoodArray = [];
    let j = 1;
    while (true) {
      const typeKey = `livelihoodtype${j}`;
      const maleKey = `livelihoodmale${j}`;
      const femalKey = `livelihoodfemale${j}`;
    
      if (values[typeKey] ) {
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
          male_headed_hh: values[maleKey],
          female_headed_hh: values[femalKey],
        });
        j++;
      } else {
        break;
      }
    }
    const landuseArray = [];
    let m = 1;
    while (true) {
      const typeKey = `type${m}`;
      const areaKey = `area${m}`;
      if (values[typeKey] && values[areaKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "LAND",
          });
          if (response.data) {
           
            values[typeKey] = response.data.data.id;
          }
        }
        landuseArray.push({
          resource_id: values[typeKey],
          amount: values[areaKey],
          capacity: 0,
          avg_per_hh: 0,
          indigenous: false,
        });
        m++;
      } else {
        break;
      }
    }
    const livestockArray = [];
    let o = 1;
    while (true) {
      const typeKey = `livestock${o}`;
      const numberKey = `numberlivestock${o}`;
      if (values[typeKey] && values[numberKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "LIVESTOCK",
          });
          console.log(response)
          if (response.data) {
           
            values[typeKey] = response.data.data.id;
          }
        }
        livestockArray.push({
          resource_id: values[typeKey],
          amount: values[numberKey],
          capacity: 0,
          avg_per_hh: 0,
          indigenous: false,
        });
        o++;
      } else {
        break;
      }
    }
    const indegeneoustreeArray = [];
    let k = 1;
    while (true) {
      const typeKey = `indegeneoustype${k}`;
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
          amount: 0,
          capacity: 0,
          avg_per_hh: 0,
          indigenous: true,
        });
        k++;
      } else {
        break;
      }
    }
    const exotictreeArray = [];
    let l = 1;
    while (true) {
      const typeKey = `exotictype${l}`;
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
          amount: 0,
          capacity: 0,
          avg_per_hh: 0,
          indigenous: false,
        });
        l++;
      } else {
        break;
      }
    }

    const forageArray = [];
    let n = 1;
    while (true) {
      const typeKey = `foragetype${n}`;
      const areaKey = `foragearea${n}`;
      if (values[typeKey] && values[areaKey]) {
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
          amount: values[areaKey],
          capacity: 0,
          avg_per_hh: 0,
          indigenous: false,
        });
        n++;
      } else {
        break;
      }
    }
    const cropArray = [];
    let p = 1;
    while (true) {
      const typeKey = `croptype${p}`;
      const areaKey = `croparea${p}`;
      if (values[typeKey] && values[areaKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "CROP",
          });
          if (response.data) {
           
            values[typeKey] = response.data.data.id;
          }
        }
        cropArray.push({
          resource_id: values[typeKey],
          amount: values[areaKey],
          capacity: 0,
          avg_per_hh: 0,
          indigenous: false,
        });
        p++;
      } else {
        break;
      }
    }
    const fruitArray = [];
    let a = 1;
    while (true) {
      const typeKey = `fruittype${a}`;
      const areaKey = `fruitarea${a}`;
      if (values[typeKey] && values[areaKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "FRUIT",
          });
          if (response.data) {
           
            values[typeKey] = response.data.data.id;
          }
        }
        fruitArray.push({
          resource_id: values[typeKey],
          amount: values[areaKey],
          capacity: 0,
          avg_per_hh: 0,
          indigenous: false,
        });
        a++;
      } else {
        break;
      }
    }
    const nurseryArray = [];
    let b = 1;
    while (true) {
      const typeKey = `nurserytype${b}`;
      const amountKey = `amount${b}`;
      const capacityKey = `capacity${b}`;
      if (values[typeKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "NURSERY",
          });
          if (response.data) {
           
            values[typeKey] = response.data.data.id;
          }
        }
        nurseryArray.push({
          resource_id: values[typeKey],
          amount: values[amountKey],
          capacity: values[capacityKey],
          avg_per_hh: 0,
          indigenous: false,
        });
        b++;
      } else {
        break;
      }
    }
    const causeofdeforestationArray = [];
    let c = 1;
    while (true) {
      const typeKey = `causeofdeforestationtype${c}`;
      if (values[typeKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "CAUSE_OF_DEFORESTATION",
          });
          if (response.data) {
           
            values[typeKey] = response.data.data.id;
          }
        }
        causeofdeforestationArray.push({
          resource_id: values[typeKey],
          amount: 0,
          capacity: 0,
          avg_per_hh: 0,
          indigenous: false,
        });
        c++;
      } else {
        break;
      }
    }
    const energy_source = { ...energy_sourceArray };
    const livelihood = { ...livelihoodArray };
    const resource = [
      ...indegeneoustreeArray,
      ...exotictreeArray,
      ...landuseArray,
      ...forageArray,
      ...livestockArray,
      ...cropArray,
      ...fruitArray,
      ...nurseryArray,
      ...causeofdeforestationArray,
    ];
   log(values)
    const data = {
      male_hh: values.householdmale2,
      female_hh: values.householdfemale2,
      male_population: values.populationmale,
      female_population: values.populationfemale,
      mhf_land_owners: values.ownsmale,
      fhf_land_owners: values.ownsfemale,
      mhf_land_lease: values.doesnotownmale2,
      fhf_land_lease: values.doesnotownfemale2,
      male_non_employed: values.unemployedmale3,
      female_non_employed: values.unemployedfemale3,

    };
    const value = { energy_source, data, livelihood, resource };
    try {
    const response = await AddKebeleData({ ...value, id: id });
    if (response.data) {
      toast.success("Kebele added successfully");
     navigate("/admin/kebele/details", { state: { id: id } });
      window.location.reload();
      // window.history.back();
    }
  } catch (error) {
    log.error(error);
    // Handle error (e.g., show a notification)
  } finally {
    setIsSubmitting(false); // End submission
  }
    log({ ...value, id: Number(id) });
  };
console.log(formData)
  return (
    <div className="bg-dashbordColor min-h-screen">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-lg font-bold mb-5">Update Kebele Data</h1>
          {loading ? (
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
                  {step === 3 && (
                    <UpdateForm3
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {step === 4 && (
                    <UpdateForm4
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {step === 5 && (
                    <UpdateForm5
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {step === 6 && (
                    <UpdateForm6
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {step === 7 && (
                    <UpdateForm7
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  <div className="mt-4 flex justify-between w-10/12">
                    {step > 1 && <FormBackButton handleBack={handleBack} />}
                    <div className="text-gray-500 text-sm">
                      Page {step} of 7
                    </div>
                    {step < 7 ? (
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
