import React from "react";

const BackButton = () => {
  // const goBack = () => {
  //   window.history.back();
  // };
  const goBack = () => {
    // Get the previous URL in the history
    const previousUrl = document.referrer;

    // Define the prefixes to skip
    const prefixesToSkip = [
      "/admin/update-siteData",
      "/admin/update-site",
      "/admin/update-kebeleData",
      "/admin/update-kebele",
      "/admin/update-weredaData",
      "/admin/update-wereda",
    ];

    // Check if the previous URL starts with any of the prefixes to skip
    for (const prefix of prefixesToSkip) {
      if (previousUrl.includes(prefix)) {
        // If the previous URL starts with a prefix, go back twice to skip it
        window.history.go(-3);
        return; // Exit the function to prevent further processing
      }
    }

    // If the previous URL doesn't start with any of the prefixes, go back once
    window.history.back();
    window.location.reload();
  };

  return (
    <button
      onClick={goBack}
      className="text-xs h-fit p-3 w-fit md:h-full md:py-1 md:px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-medium"
    >
      Back
    </button>
  );
};

export default BackButton;
