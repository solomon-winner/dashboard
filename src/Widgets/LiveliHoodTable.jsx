import React from 'react';

const LivelihoodTable = ({ livelihoods }) => {
  if (!Array.isArray(livelihoods)) return <div>No Data</div>;

  return (
    <div>
      <h4  className="px-4">Livelihoods</h4>
      <hr />
      <table className="table-auto ">
        <thead>
          <tr>
            <th className="px-4 py-2 text-xl">Type</th>
            <th className="px-4 py-2 text-xl">Male Headed HH</th>
            <th className="px-4 py-2 text-xl">Female Headed HH</th>
          </tr>
        </thead>
        <tbody>
          {livelihoods.map((livelihood, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-sm font-bold">{livelihood.value}</td>
              <td className="border px-4 py-2 text-sm">{livelihood.male_headed_hh}</td>
              <td className="border px-4 py-2 text-sm">{livelihood.female_headed_hh}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default LivelihoodTable;
