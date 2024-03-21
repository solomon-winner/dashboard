import { useDispatch } from "react-redux";
import {useGetInstitutionByTypeQuery} from "../institutions/InstitutionsApislice";
import { setHealthFacility, setSchool } from "../institutions/InstitutionsState";
import { useEffect } from "react";

export const useGetInstitution = () => {
const { data: school, isSuccess: schoolSuccess } = useGetInstitutionByTypeQuery("SCHOOL");
const { data: healthFacility, isSuccess: healthFacilitySuccess } = useGetInstitutionByTypeQuery("HEALTH_FACILITY");

const dispatch = useDispatch();
useEffect(() => {
    if(schoolSuccess && healthFacilitySuccess) {
        // Check if school and healthFacility are defined before accessing their data
        if (school && healthFacility) {
            dispatch(setSchool(school.data));
            dispatch(setHealthFacility(healthFacility.data));
        }
    }
}, [schoolSuccess, healthFacilitySuccess, dispatch]);
}