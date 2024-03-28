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
import { useAddKebeleDataMutation, useGetKebeleByIdQuery } from "../../redux/kebele/KebeleApiSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import MainLoading from "../Resource/Loading/MainLoading";

const validationSchema = Yup.object().shape({
  // Define your validation schema here if needed
});
export const kebeledata = [
  {
    region: "Amhara",
    wereda: "Dera",
    kebele: "Agar",
    male: 3808,
    female: 3515,
    male2: 100,
    female2: 100,
    types: [
      { type: "Settlement", area: 2.2 },
      { type: "Comminal Grazing", area: 234.6 },
      { type: "Forest", area: 324.96 },
      { type: "Agriculture/Farm land", area: 3148.09 },
      { type: "Bush land", area: 519.36 },
      { type: "Degraded land/Bad land", area: 520 },
    ],
    maleownland: 985,
    femaleownland: 562,
    maledontownland: 0,
    femaledontownland: 0,
    unemployedmale: 0,
    unemployedfemale: 0,
    malecropproduction: 153,
    femalecropproduction: 31,
    malelivestockproduction: 0,
    femalelivestockproduction: 0,
    maledairyproduction: 52,
    femaledairyproduction: 10,
    malebeekeeping: 0,
    femalebeekeeping: 0,
    malelivestockandcropproduction: 760,
    femalelivestockandcropproduction: 153,
    malenonfarmactivites: 20,
    femalenonfarmactivites: 4,
    maleforestseeding: 0,
    femaleforestseeding: 0,
    malepettytrade: 13,
    femalepettytrade: 3,
    maleothers: 23,
    femaleothers: 5,
    oxen: 2627,
    cows: 2789,
    goat: 1305,
    sheep: 2362,
    camel: 0,
    donkey: 1136,
    horse: 35,
    poultry: 4735,
    other: 64,
    Forage: [
      {
        type: "",
        area: 0,
      },
    ],
    crop: [
      {type: "Teff", area: 1101},
      {type: "Maize", area: 472},
      {type: "Dagusa", area: 1574},

    ],
    fruit: [
      {fruittype: "Mango", fruitarea: 14},
      {fruittype: "Avocado", fruitarea: 2},
      {fruittype: "Zeytun", fruitarea: 5},
      {fruittype: "Orange", fruitarea: 3},
      {fruittype: "Banana", fruitarea: 9},
    ],
    typeindegeneous: [
      { typeindegeneous: "Cordia africana" },
      { typeindegeneous: "Croton macrostachyus" },
    ],
    typeexotic: [
      { typeexotic: "Eucalyptus globules" },
      { typeexotic: "Acacia decurrens" },
      { typeexotic: "Cupressus Iusitanica"},
      { typeexotic: "Eucalyptus camaldulensis" },
    ],
    localamount: 0,
    localcap:0,
    communityamt: 0,
    communitycap: 0,
    individualamt: 5,
    individualcap: 150000,
    Cause: [
      {deforestation: "Fuel wood"},
      {deforestation: "Farm land expanstion"},
      {deforestation: "Free grazing"},
    ],
    sourceofenergy: [
      {electricity: "low"},
      {firewood: "high"},
      {animaldung: "high"},
      {cropresidue: "medium"},
      {charcoal: "low"},
      {biogas: "low"},
      {solar: "low"},
    ]
  }, 
];
export const UpdateKebele = () => {
  const {id} = useParams();
  const {data: kebeledata, isFetching,isSuccess } = useGetKebeleByIdQuery(id);
  const [addResource] = useAddResourceMutation();
  const [AddKebeleData] = useAddKebeleDataMutation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    if(isSuccess && kebeledata) {
      const data = kebeledata?.data
      const populationmale = data?.kebele_data?.male_population;
      const populationfemale = data?.kebele_data?.female_population;
      const householdmale2 = data?.kebele_data?.male_hh;
      const householdfemale2 = data?.kebele_data?.female_hh;
      const ownsmale = data?.kebele_data?.mhf_land_owners;
      const ownsfemale = data?.kebele_data?.fhf_land_owners;
      const doesnotownmale2 = data?.kebele_data?.mhf_land_lease;
      const doesnotownfemale2 = data?.kebele_data?.fhf_land_lease;
      const unemployedmale3 = data?.kebele_data?.male_non_employed;
      const unemployedfemale3 = data?.kebele_data?.female_non_employed;
      const land = data.resources.find(resource => resource.hasOwnProperty('LAND'));
      const landResource = land?.LAND ? land.LAND.map(
        (item, index) => ({
           [`type${index + 1}`]: item.id,
           [`area${index + 1}`]: item.amount,
           [`name${index + 1}`]: item.value
        })
       ) : [];
       setFormData({
        populationmale,
        populationfemale,
        householdmale2,
        householdfemale2,
        ownsmale,
        ownsfemale,
        doesnotownmale2,
        doesnotownfemale2,
        unemployedmale3,
        unemployedfemale3,
        ...landResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
       })
      console.log({
        populationmale,
        populationfemale,
        householdmale2,
        householdfemale2,
        ownsmale,
        ownsfemale,
        doesnotownmale2,
        doesnotownfemale2,
        unemployedmale3,
        unemployedfemale3,
        ...landResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
       })
    }
  },[isSuccess,kebeledata])
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
    // const response = await AddKebeleData({...value,id:values.kebele_id});
    // console.log(response);
    // if (response.data) {
    //   toast.success("Kebele added successfully");
    // } else {
    //   toast.error(response.error.data.message);
    // }
    console.log({...value,id:values.kebele_id});
  };

  return (
    <div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Update Kebele</h1>
          {isFetching ? ( <MainLoading/>):
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
             {({ handleChange }) => (
            <Form>
              {step === 1 && <UpdateForm handleChange={handleChange} formData={formData} setFormData={setFormData} />}
              {step === 2 && <UpdateForm2 handleChange={handleChange} formData={formData} setFormData={setFormData} />}
              {step === 3 && <UpdateForm3 handleChange={handleChange} formData={formData} setFormData={setFormData} />}
              {step === 4 && <UpdateForm4 handleChange={handleChange} formData={formData} setFormData={setFormData} />}
              {step === 5 && <UpdateForm5 handleChange={handleChange} formData={formData} setFormData={setFormData} />}
              {step === 6 && <UpdateForm6 handleChange={handleChange} formData={formData} setFormData={setFormData} />}
              {step === 7 && <UpdateForm7 handleChange={handleChange} formData={formData} setFormData={setFormData} />}
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
          }
        </div>
      </div>
    </div>
  );
};
