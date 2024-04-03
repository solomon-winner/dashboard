import React from 'react';
import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();

  function goBack() {
    // Go back to the previous page
    history.goBack();
  }

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default MyComponent;
