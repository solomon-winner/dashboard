import React from 'react';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      className="text-sm py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold"
    >
      Back
    </button>
  );
};

export default BackButton;

