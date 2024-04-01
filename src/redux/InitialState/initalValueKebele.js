import React,{ useEffect } from "react";
import { useGetKebeleByIdQuery } from "../kebele/KebeleApiSlice";
import { useDispatch } from "react-redux";
import { setKebeleById } from "../kebele/KebeleByIdState";

export const useInitialValueKebele  = (id) => {
    const {data: kebeledata, isFetching,isSuccess } = useGetKebeleByIdQuery(id);
    const dispatch = useDispatch();
    useEffect(() => {
        if(isSuccess && kebeledata) {
          console.log(kebeledata.data)
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
           const livelihoodResource = data?.livelihoods ? data.livelihoods.map(
            (item, index) => ({
              [`livelihoodtype${index + 1}`]: item.id,
              [`livelihoodmale${index + 1}`]: item.male_headed_hh,
              [`livelihoodfemale${index + 1}`]: item.female_headed_hh,
              [`livelihoodname${index + 1}`]: item.value
            })
           ):[];
           const livestock = data.resources.find(resource => resource.hasOwnProperty('LIVESTOCK'));
           const livestockResource = livestock?.LIVESTOCK ? livestock.LIVESTOCK.map(
            (item, index) => ({
               [`livestock${index + 1}`]: item.id,
               [`numberlivestock${index + 1}`]: item.amount,
               [`namelivestock${index + 1}`]: item.value
            })
           ) : [];
           const crop = data.resources.find(resource => resource.hasOwnProperty('CROP'));
           const cropResource = crop?.CROP ? crop.CROP.map(
            (item, index) => ({
               [`croptype${index + 1}`]: item.id,
               [`croparea${index + 1}`]: item.amount,
               [`cropname${index + 1}`]: item.value
            })
           ) : [];
           const fruit = data.resources.find(resource => resource.hasOwnProperty('FRUIT'));
           const fruitResource = fruit?.FRUIT ? fruit.FRUIT.map(
            (item, index) => ({
               [`fruittype${index + 1}`]: item.id,
               [`fruitarea${index + 1}`]: item.amount,
               [`fruitname${index + 1}`]: item.value
            })
           ) : [];
           const tree = data.resources.find(resource => resource.hasOwnProperty('TREE'));
           let indegeneousIndex = 1;
           let exoticIndex = 1;
           const treeResource = tree?.TREE ? tree.TREE.map(
            (item, index) => {
               let key;
               let typeKey;
               let nameKey;
               if (item.indigenous) {
                   key = 'indegeneous';
                   typeKey = `indegeneoustype${indegeneousIndex}`;
                   nameKey = `indegeneousname${indegeneousIndex}`;
                   indegeneousIndex++;
               } else {
                   key = 'exotic';
                   typeKey = `exotictype${exoticIndex}`;
                   nameKey = `exoticname${exoticIndex}`;
                   exoticIndex++;
               }
               return {
                 [typeKey]: item.id,
                 [nameKey]: item.value
               };
            }
           ) : [];
           const nursery = data.resources.find(resource => resource.hasOwnProperty('NURSERY'));
           const nurseryResource = nursery?.NURSERY ? nursery.NURSERY.map(
            (item, index) => ({
               [`nurserytype${index + 1}`]: item.id,
               [`amount${index + 1}`]: item.amount,
               [`capacity${index + 1}`]: item.capacity,
               [`nurseryname${index + 1}`]: item.value
            })
           ) : [];
           console.log(nurseryResource)
          const kebeleData = {
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
            ...livelihoodResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
            ...livestockResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
            ...cropResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
            ...fruitResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
            ...treeResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
            ...nurseryResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
           }
           dispatch(setKebeleById(kebeleData))
          console.log(kebeleData)
        }
      },[isSuccess,kebeledata])

}