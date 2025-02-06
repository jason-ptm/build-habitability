import { TemperatureStandardEnum } from "../constants/constants";
import { Apartment } from "../model/apartment";
import { LinkInterface, NodeInterface } from "../model/graph";

export const getNodesAndLinks = (building: Apartment[][][]) => {
  const nodes: NodeInterface[] = [];
  const linksMap: Map<string, LinkInterface> = new Map();

  // Crear nodos
  let apartmentIndexMap: Map<string, number> = new Map();

  let index = 0;
  for (let z = 0; z < building.length; z++) {
    for (let i = 0; i < building[z].length; i++) {
      for (let j = 0; j < building[z][i].length; j++) {
        const apartment = building[z][i][j];
        let group = 0;
        if (apartment.temperature < TemperatureStandardEnum.LOW) {
          group = 1;
        } else if (apartment.temperature > TemperatureStandardEnum.HIGH) {
          group = 3;
        } else {
          group = 2;
        }
        nodes.push({
          name: `${apartment.code} - ${apartment.temperature.toFixed(2)}°C`,
          group,
        });
        apartmentIndexMap.set(apartment.id, index);
        index++;
      }
    }
  }

  // Crear enlaces
  for (let z = 0; z < building.length; z++) {
    for (let i = 0; i < building[z].length; i++) {
      for (let j = 0; j < building[z][i].length; j++) {
        const apartment = building[z][i][j];
        const currentIdx = apartmentIndexMap.get(apartment.id);

        // Recorremos cada muro del apartamento
        for (const [key, wall] of Object.entries(apartment.walls)) {
          if (wall && wall.apartments.length === 2) {
            // Solo muros con dos apartamentos conectados
            const neighborId = wall.apartments.find(
              (id: any) => id !== apartment.id
            );
            const neighborIdx = apartmentIndexMap.get(neighborId!);

            // Crear un identificador único para cada par de nodos
            // El orden no importa porque es un muro compartido
            let linkKey = [
              Math.min(currentIdx!, neighborIdx!),
              Math.max(currentIdx!, neighborIdx!),
            ].join("-");

            if (!linksMap.has(linkKey)) {
              linksMap.set(linkKey, {
                source: currentIdx!,
                target: neighborIdx!,
                value: 1,
              });
            }
          }
        }
      }
    }
  }

  return { nodes, links: Array.from(linksMap.values()) };
};
