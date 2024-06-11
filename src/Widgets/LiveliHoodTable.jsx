import React from 'react';

const LivelihoodTable = ({ livelihoods }) => {
  if (!Array.isArray(livelihoods)) return <div>No Data</div>;

  return (
    <div>
      <h4  className="px-4">Livelihoods</h4>
      <hr />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-2 py-2 text-lg">Type</th>
            <th className="px-2 py-2 text-lg">Male Headed HH</th>
            <th className="px-2 py-2 text-lg">Female Headed HH</th>
          </tr>
        </thead>
        <tbody>
          {livelihoods.map((livelihood, index) => (
            <tr key={index}>
              <td className="border px-2 py-2 font-bold">{livelihood.value}</td>
              <td className="border px-2 py-2">{livelihood.male_headed_hh}</td>
              <td className="border px-2 py-2">{livelihood.female_headed_hh}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default LivelihoodTable;
