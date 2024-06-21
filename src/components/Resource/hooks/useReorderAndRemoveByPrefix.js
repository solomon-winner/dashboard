// hooks/useReorderAndRemoveByPrefix.js

import { useCallback } from 'react';

const useReorderAndRemoveByPrefix = (initialData, prefixToRemove) => {
  const reorderAndRemove = useCallback((idToRemove) => {
    const updatedData = {...initialData };
    delete updatedData[`${prefixToRemove}${idToRemove}`];

    let newData = {};
    let index = 1;

    for (let key in updatedData) {
      if (key.startsWith(prefixToRemove)) {
        newData[`${prefixToRemove}${index}`] = updatedData[key];
        index++;
      } else {
        newData[key] = updatedData[key];
      }
    }

    return newData;
  }, [initialData, prefixToRemove]);

  return reorderAndRemove;
};

export default useReorderAndRemoveByPrefix;