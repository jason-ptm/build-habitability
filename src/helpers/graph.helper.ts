import { ApartmentInterface } from "../model/apartment";

interface Node {
  name: string;
  group: number; // Puedes decidir qué usar como 'group', aquí lo marco como 1 por defecto
}

interface Link {
  source: number;
  target: number;
  value: number; // Puedes definir el valor adecuado para tu caso, por simplicidad es 1
}

export const getGraphJSON = (apartments: ApartmentInterface[]) => {
  const nodes: Node[] = apartments.map((apartment) => ({
    name: apartment.code,
    group: 1, // Se puede ajustar según la lógica que requieras
  }));

  const links: Link[] = [];
  const apartmentIndexMap = new Map<string, number>();

  // Crear un mapa para encontrar rápidamente el índice de un apartamento por su código
  apartments.forEach((apartment, index) => {
    apartmentIndexMap.set(apartment.id, index);
  });

  // Recorremos cada pared y sus apartamentos para formar los enlaces
  apartments.forEach((apartment) => {
    apartment.walls.forEach((wall) => {
      const sharedApartments = wall.apartments;

      if (sharedApartments.length > 1) {
        for (let i = 0; i < sharedApartments.length - 1; i++) {
          for (let j = i + 1; j < sharedApartments.length; j++) {
            const sourceIndex = apartmentIndexMap.get(sharedApartments[i].id);
            const targetIndex = apartmentIndexMap.get(sharedApartments[j].id);
            if (sourceIndex !== undefined && targetIndex !== undefined) {
              links.push({
                source: sourceIndex,
                target: targetIndex,
                value: 1, // Valor, podría representar "peso" en un grafo, ajústalo si es necesario
              });
            }
          }
        }
      }
    });
  });

  return { nodes, links };
};
