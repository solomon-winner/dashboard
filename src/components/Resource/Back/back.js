import React from 'react';
import { useHistory } from 'react-router-dom';


 function goBack() {
      const history = useHistory();

    history.goBack();
  }

  



export default goBack;
