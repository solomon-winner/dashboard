import React from "react";

export const FormBackButton = ({ handleBack }) => {
  return (
    <button
      type="button"
      onClick={handleBack}
      className=" bg-lightgreen text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
    >
      Prev
    </button>
  );
};

export const FormNextButton = ({ handleNext }) => {
  return (
    <button
    type="button"
    onClick={handleNext}
    className="bg-mainColor text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
  >
    Next
  </button>
  );
};

// export const FormSubmitButton = () => {
//   return (
//     <button
//     type="submit"
//     className="bg-mainColor text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
//   >
//     Submit
//   </button>
//   );
// };
