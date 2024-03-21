// import React, { useState } from "react";
// import {
//   AddCircleOutline,
//   Delete,
//   FamilyRestroom,
//   Forest,
//   Grass,
// } from "@mui/icons-material";
// import { FormField } from "../../wereda/AddWereda";
// import { kebeledata } from "../UpdateKebele";

// export const UpdateForm5 = ({ handleChange }) => {
//   const [updateData, setUpdateData] = useState(kebeledata[0]);
//   const [fields, setFields] = useState({
//     crop: updateData.crop.map((item, index) => ({ id: index, type: item.type, area: item.area })),
//     fruit: updateData.fruit.map((item, index) => ({ id: index, type: item.fruittype, area: item.fruitarea })),
//     indegeneous: updateData.typeindegeneous.map((item, index) => ({ id: index, type: item.typeindegeneous })),
//     exotic: updateData.typeexotic.map((item, index) => ({ id: index, type: item.typeexotic }))
//   });
//   const addField = (category) => {
//     const highestId = fields[category].reduce((highest, field) => Math.max(highest, field.id),  0);
//     setFields(prevFields => ({
//       ...prevFields,
//       [category]: [...prevFields[category], { id: highestId +  1, type: "", area: "" }]
//     }));
//   };

//   const removeField = (category, id) => {
//     setFields(prevFields => ({
//       ...prevFields,
//       [category]: prevFields[category].filter(field => field.id !== id)
//     }));
//   };

//   const handleFieldChange = (category, id, key, value) => {
//     setFields(prevFields => ({
//       ...prevFields,
//       [category]: prevFields[category].map(field => 
//         field.id === id ? { ...field, [key]: value } : field
//       )
//     }));
//   };
//   return (
//     <div>
//       {Object.keys(fields).map(category => (
//         <div key={category}>
//           <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">{category}</h6>
//           <div className="flex flex-wrap">
//             {fields[category].map((field, index) => (
//               <React.Fragment key={field.id}>
//                 <FormField
//                   label="Type"
//                   name={`${category}type${index +  1}`}
//                   type="dropdown"
//                   placeholder={`Type of ${category}`}
//                   icon={category === 'crop' ? Grass : Forest}
//                   list={`${category}type${index +  1}`}
//                   options={option[category]}
//                   value={field.type}
//                   handleChange={handleChange}
//                   onChange={handleChange}
//                 />
//                 {/* Conditionally render the Area FormField only for crop and fruit categories */}
//                 {(category === 'crop' || category === 'fruit') && (
//                   <FormField
//                     label="Area"
//                     name={`${category}area${index +  1}`}
//                     type="text"
//                     placeholder="Area"
//                     value={field.area}
//                     handleChange={(e) => handleFieldChange(category, field.id, 'area', e.target.value)}
//                   />
//                 )}
//                 <Delete onClick={() => removeField(category, field.id)} className="lg:mt-8" />
//               </React.Fragment>
//             ))}
//             <AddCircleOutline onClick={() => addField(category)} className="lg:mt-8" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

