import { useEffect } from "react";
import { useGetWeredaByIdQuery } from "../wereda/WeredaApiSlice";
import { setWeredas } from "../wereda/WeredaState";
import { useDispatch } from "react-redux";

export const useInitalValueworeda = (id) => {
    const {
        data: woredadata,isSuccess} = useGetWeredaByIdQuery(id);
        const dispatch = useDispatch();
        
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
                
                const woreda ={
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
                };
               dispatch(setWeredas(woreda));
              }
        }, [isSuccess, woredadata, dispatch]);
}