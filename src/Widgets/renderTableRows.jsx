export const RenderTableRows = ({ rows }) => {
    return (
      <>
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="border px-2 py-2 font-bold">{row.label}</td>
            <td className="border px-2 py-2">{row.value}</td>
          </tr>
        ))}
      </>
    );
  };
  
  
  