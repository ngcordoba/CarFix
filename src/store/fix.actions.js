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

                        console.log('Reparación guardada en la base de datos con ID:', insertId);
                        dispatch(loadRepairs());
                    },
                    (_, error) => {

                        console.log('Error al guardar la reparación:', error);
                    }
                );
            });
        } catch (error) {
            console.log('Error al abrir la base de datos:', error);
        }
    };
};