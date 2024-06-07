import React from 'react';
import KebeleResourceTable from './KebeleResourceTable';
import LivelihoodTable from './LiveliHoodTable';
import EnergyResourcesTable from './EnergyResourcesTable';

const RenderKebeleResourceTables = ({ resources }) => {
  return (
    <div>
      {resources.map((resourceObj, index) => {
        const resourceType = Object.keys(resourceObj)[0];
        if (resourceType === "TREE") {
          const indigenousTrees = resourceObj[resourceType].filter(tree => tree.indigenous);
          const exoticTrees = resourceObj[resourceType].filter(tree => !tree.indigenous);
          return (
            <React.Fragment key={index}>
              <KebeleResourceTable resources={indigenousTrees} resourceName="Indigenous Trees" />
              <KebeleResourceTable resources={exoticTrees} resourceName="Exotic Trees" />
            </React.Fragment>
          );
        } else if (resourceType === "LIVELIHOOD") {
          return (
            <LivelihoodTable key={index} livelihoods={resourceObj[resourceType]} />
          );
        } else if (resourceType === "ENERGY_RESOURCES") {
          return (
            <EnergyResourcesTable key={index} energyResources={resourceObj[resourceType]} />
          );
        } else {
          return (
            <KebeleResourceTable key={index} resources={resourceObj[resourceType]} resourceName={resourceType} />
          );
        }
      })}
    </div>
  );
};

export default RenderKebeleResourceTables;
