import React from 'react';
import { View } from 'react-native';
import ProcessStepCard from './cardProcess'; 


const processSteps = [
  {
    step: 1,
    title: 'Filtración Profunda',
    description: 'Eliminamos sedimentos, arena y partículas suspendidas a través de un filtro de lecho profundo para una claridad inicial.',
  },
  {
    step: 2,
    title: 'Carbón Activado',
    description: 'El agua pasa por filtros de carbón activado para eliminar cloro, olores, sabores y compuestos orgánicos.',
  },
  {
    step: 3,
    title: 'Ósmosis Inversa',
    description: 'La etapa crucial. Usamos membranas de alta tecnología para remover hasta el 99% de minerales disueltos y contaminantes.',
  },
  {
    step: 4,
    title: 'Desinfección UV y Ozono',
    description: 'Un paso final de seguridad que utiliza luz ultravioleta y ozono para inactivar cualquier microorganismo restante.',
  },
];

const Process = () => {
  return (
    <View className="px-5 mt-8 mb-10">
      <View className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200" />

      {processSteps.map((item, index) => {
        const isRightSide = index % 2 === 0;

        return (
          <View key={item.step} className="flex-row items-center my-4">
            {isRightSide ? (
              <View className="w-1/2" />
            ) : (
              <View className="w-1/2 pr-4">
                <ProcessStepCard {...item} />
              </View>
            )}

            <View className="absolute left-1/2 -ml-2 h-4 w-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-800" />

            {isRightSide ? (
              <View className="w-1/2 pl-4">
                <ProcessStepCard {...item} />
              </View>
            ) : (
              <View className="w-1/2" />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Process;
