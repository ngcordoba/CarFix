import { openDatabase } from '../../db/database';

export const loadRepairs = (repair) => {
    return {
        type: 'LOAD_REPAIR',
        payload: repair,
    };
};

export const addRepair = (repairData) => {
    return async (dispatch) => {
        try {
            const db = await openDatabase();

            // Ejecutar una transacción de inserción en la base de datos
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO repairs (vehicle, date, description, cost, mechanic, location) VALUES (?, ?, ?, ?, ?, ?)',
                    [
                        repairData.vehicle,
                        repairData.date,
                        repairData.description,
                        repairData.cost,
                        repairData.mechanic,
                        repairData.location,
                    ],
                    (_, { insertId }) => {
                        // La reparación se ha guardado exitosamente en la base de datos
                        console.log('Reparación guardada en la base de datos con ID:', insertId);

                        // También puedes dispatch una acción para actualizar el estado de Redux si es necesario

                        // Ejemplo de cómo cargar todas las reparaciones después de guardar una nueva
                        dispatch(loadRepairs());
                    },
                    (_, error) => {
                        // Error al guardar la reparación en la base de datos
                        console.log('Error al guardar la reparación:', error);
                    }
                );
            });
        } catch (error) {
            console.log('Error al abrir la base de datos:', error);
        }
    };
};