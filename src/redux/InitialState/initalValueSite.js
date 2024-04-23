import { useEffect } from "react";
import { useGetSiteByIdQuery } from "../site/SiteApiSlice";
import { useDispatch } from "react-redux";
import { setLoading, setSiteById } from "../site/SiteByIdState";

export const useInitialValueSite = (id) => {
  const { data: sitedata, isSuccess } = useGetSiteByIdQuery(id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && sitedata) {
      const data = sitedata?.data;
      if (!data.resources) {
        dispatch(setLoading());
        return 
      }
      const tree = data?.resources.find((resource) =>
        resource.hasOwnProperty("TREE")
      );
      let indegeneousIndex = 1;
      let exoticIndex = 1;
      const treeResource = tree?.TREE
        ? tree.TREE.map((item, index) => {
            let key;
            let typeKey;
            let nameKey;
            if (item.indigenous) {
              key = "indegeneous";
              typeKey = `indegeneoustype${indegeneousIndex}`;
              nameKey = `indegeneousname${indegeneousIndex}`;
              indegeneousIndex++;
            } else {
              key = "exotic";
              typeKey = `exotictype${exoticIndex}`;
              nameKey = `exoticname${exoticIndex}`;
              exoticIndex++;
            }
            return {
              [typeKey]: item.id,
              [nameKey]: item.value,
            };
          })
        : [];
      const land = data.resources.find((resource) =>
        resource.hasOwnProperty("LAND")
      );
      const landResource = land?.LAND
        ? land.LAND.map((item, index) => ({
            [`currentlandusetype${index + 1}`]: item.id,
            [`currentlandusename${index + 1}`]: item.value,
          }))
        : [];
      const forage = data.resources.find((resource) =>
        resource.hasOwnProperty("FORAGE")
      );
      const forageResource = forage?.FORAGE
        ? forage.FORAGE.map((item, index) => ({
            [`foragetype${index + 1}`]: item.id,
            [`foragename${index + 1}`]: item.value,
          }))
        : [];
      const livelihood = data.resources.find((resource) =>
        resource.hasOwnProperty("LIVELIHOOD")
      );
      const livelihoodResource = livelihood?.LIVELIHOOD
        ? livelihood.LIVELIHOOD.map((item, index) => ({
            [`livelihoodtype${index + 1}`]: item.id,
            [`livelihoodname${index + 1}`]: item.value,
          }))
        : [];
      const siteData = {
        ...treeResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...landResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...forageResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
        ...livelihoodResource.reduce((acc, item) => ({ ...acc, ...item }), {}),
      };
      dispatch(setSiteById(siteData));
    }
  }, [isSuccess, sitedata]);
};
