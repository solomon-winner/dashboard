import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AddForm } from "./addform/AddForm";
import { AddForm2 } from "./addform/AddForm2";
import { AddForm3 } from "./addform/AddForm3";
import { AddForm4 } from "./addform/AddForm4";
import { AddForm5 } from "./addform/AddForm5";
import { AddForm6 } from "./addform/AddForm6";
import { AddForm7 } from "./addform/AddForm7";
import { toast } from "react-toastify";
import { useAddKebeleDataMutation } from "../../redux/kebele/KebeleApiSlice";
import { useAddResourceMutation } from "../../redux/resource/ResourceApiSlice";

const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});

export const AddKebele = () => {
  const [addResource] = useAddResourceMutation();
  const [AddKebeleData] = useAddKebeleDataMutation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    region_id: "",
    woreda_id: "",
    kebele_id: "",
    populationmale: "",
    populationfemale: "", 
    householdmale2: "", 
    householdfemale2: "",
    ownsmale: "",
    ownsfemale: "",
    doesnotownmale2: "",
    doesnotownfemale2: "",
    unemployedmale3: "",
    unemployedfemale3: "",
  });

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async(values) => {
    const energy_sourceArray = [];
    let i = 1;
    while (true) {
       const typeKey = `energy_sourcetype${i}`;
       const energyKey = `energy_source${i}`;
       if (values[typeKey]&& values[energyKey]) {
         if (isNaN(values[typeKey])) {
           const response = await addResource({ name:values[typeKey],resource_type:"ENERGY_SOURCE" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
       const typeKey = `livelihood${j}`;
       const maleKey = `livelihoodmale${j}`;
       const femalKey = `livelihoodfemale${j}`;

       if (values[typeKey] && values[maleKey] && values[femalKey]) {
         if (isNaN(values[typeKey])) {
           const response = await addResource({ name:values[typeKey],resource_type:"ENERGY_SOURCE" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
           const response = await addResource({ name:values[typeKey],resource_type:"LAND" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
           const response = await addResource({ name:values[typeKey],resource_type:"LIVESTOCK" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
           const response = await addResource({ name:values[typeKey],resource_type:"TREE" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
           const response = await addResource({ name:values[typeKey],resource_type:"TREE" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
       const typeKey = `forgetype${n}`;
       const areaKey = `forgearea${n}`;
       if (values[typeKey] && values[areaKey]) {
         if (isNaN(values[typeKey])) {
           const response = await addResource({ name:values[typeKey],resource_type:"FORAGE" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
           const response = await addResource({ name:values[typeKey],resource_type:"CROP" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
           const response = await addResource({ name:values[typeKey],resource_type:"FRUIT" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
       if (values[typeKey] && values[amountKey] && values[capacityKey]) {
         if (isNaN(values[typeKey])) {
           const response = await addResource({ name:values[typeKey],resource_type:"NURSERY" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
           }
         }
         nurseryArray.push({
          resource_id: values[typeKey],
          amount: 0,
          capacity: values[capacityKey],
          avg_per_hh: values[amountKey],
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
       const typeKey = `causeofdeforestation${c}`;
       if (values[typeKey] ) {
         if (isNaN(values[typeKey])) {
           const response = await addResource({ name:values[typeKey],resource_type:"CAUSE_OF_DEFORESTATION" });
           if (response.data) {
             toast.success("Resource added successfully");
             values[typeKey] = response.data.data.id;
           } else {
             toast.error(response.error.data.message);
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
    const energy_source = {...energy_sourceArray};
    const livelihood = {...livelihoodArray};
    const resource = [...indegeneoustreeArray,...exotictreeArray,...landuseArray,...forageArray,...livestockArray,...cropArray,...fruitArray,...nurseryArray];
    const data ={
    male_hh: values.householdmale2,
    female_hh: values.householdfemale2,
    male_population: values.populationmale,
    female_population: values.populationfemale,
    mhf_land_owners: values.ownsmale,
    fhf_land_owners: values.ownsfemale,
    mhf_land_lease: values.doesnotownmale2,
    fhf_land_lease: values.doesnotownfemale2,
    male_non_employed: values.unemployedmale3,
    female_non_employed: values.unemployedfemale3
    }
    const value = {energy_source, data, livelihood,resource }
    const response = await AddKebeleData({...value,id:values.kebele_id});
    console.log(response);
    if (response.data) {
      toast.success("Kebele added successfully");
    } else {
      toast.error(response.error.data.message);
    }
    console.log({...value,id:values.kebele_id});
  };

  return (
    <div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Add Kebele</h1>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
             {({ handleChange }) => (
            <Form>
              {step === 1 && <AddForm handleChange={handleChange} formData={formData} setFormData={setFormData} />}
              {step === 2 && <AddForm2 handleChange={handleChange} formData={formData} setFormData={setFormData}/>}
              {step === 3 && <AddForm3 handleChange={handleChange} formData={formData} setFormData={setFormData}/>}
              {step === 4 && <AddForm4 handleChange={handleChange} formData={formData} setFormData={setFormData}/>}
              {step === 5 && <AddForm5 handleChange={handleChange} formData={formData} setFormData={setFormData}/>}
              {step === 6 && <AddForm6 handleChange={handleChange} formData={formData} setFormData={setFormData}/>}
              {step === 7 && <AddForm7 handleChange={handleChange} formData={formData} setFormData={setFormData}/>}
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
