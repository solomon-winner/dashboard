import React from 'react';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      className="text-xs py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-medium"
    >
      Back
    </button>
  );
};

export default BackButton;

