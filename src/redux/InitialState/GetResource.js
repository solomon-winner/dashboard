import { useDispatch } from "react-redux";
import { useGetResourceByTypeQuery } from "../resource/ResourceApiSlice";
import { setCauseofdeforestation, setCrop, setEnergy_source, setForage, setFruit, setLandUse, setLiveStock, setLivelihood, setNursery, setRoad, setTree } from "../resource/ResourceState";
import { useEffect } from "react";

export const useGetResource = () => {
 const { data: landUse, isSuccess } = useGetResourceByTypeQuery("LAND");
 const { data: road, isSuccess: roadSuccess } = useGetResourceByTypeQuery("ROAD");
 const { data: tree, isSuccess: treeSuccess,isFetching } = useGetResourceByTypeQuery("TREE");
 const { data:forage, isSuccess: forageSuccess } = useGetResourceByTypeQuery("FORAGE");
 const { data: livelihood, isSuccess: livelihoodSuccess } = useGetResourceByTypeQuery("LIVELIHOOD");
 const { data: livestock, isSuccess: livestockSuccess } = useGetResourceByTypeQuery("LIVESTOCK");
 const {data: crop, isSuccess: cropSuccess } = useGetResourceByTypeQuery("CROP");
 const {data: fruit, isSuccess: fruitSuccess } = useGetResourceByTypeQuery("FRUIT");
 const {data: nursery, isSuccess: nurserySuccess } = useGetResourceByTypeQuery("NURSERY");
 const {data: causeofdeforestation, isSuccess: causeofdeforestationSuccess } = useGetResourceByTypeQuery("CAUSE_OF_DEFORESTATION");
 const {data: energy_source, isSuccess: energy_sourceSuccess } = useGetResourceByTypeQuery("ENERGY_SOURCE");
 const dispatch = useDispatch();

 useEffect(() => {
    if (isSuccess) {
      dispatch(setLandUse(landUse.data));
    }
    if (roadSuccess) {
      dispatch(setRoad(road.data));
    }
    if (treeSuccess) {
      dispatch(setTree(tree.data));
    }
    if(forageSuccess){
      dispatch(setForage(forage.data));
    }
    if(livelihoodSuccess){
      dispatch(setLivelihood(livelihood.data));
    }
    if(livestockSuccess){
      dispatch(setLiveStock(livestock.data));
    }
    if(cropSuccess){
      dispatch(setCrop(crop.data));
    }
    if(fruitSuccess){
      dispatch(setFruit(fruit.data));
    }
    if(nurserySuccess){
      dispatch(setNursery(nursery.data));
    }
    if(causeofdeforestationSuccess){
      dispatch(setCauseofdeforestation(causeofdeforestation.data));
    }
    if(energy_sourceSuccess){
      dispatch(setEnergy_source(energy_source.data));
    }
 }, [isSuccess,roadSuccess,treeSuccess,forageSuccess,livelihoodSuccess,livestockSuccess,cropSuccess,fruitSuccess,nurserySuccess,causeofdeforestationSuccess,energy_sourceSuccess,dispatch]);
};