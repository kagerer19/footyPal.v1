// All code is for testing purposes only
import cong from "./config/firebaseConfig";
const COLLECTION_NAME = "teams";

export type Location = {
    id: string;
    LocationAddress: string;
    LocationName: string;
    LocationCoordinates: [number, number];
}


// retrieve all todos
export const all = async (): Promise<Array<Location>> => {
    const snapshot = await cong.collection(COLLECTION_NAME).get();
    const data: Array<any> = [];

    snapshot.docs.map((_data: { id: any; data: () => any; }) => {
        data.push({
            id: _data.id, // because id field in separate function in firestore
            ..._data.data(), // the remaining fields
        });
    });

    // return and convert back it array of todo
    return data as Array<Location>;
};


all().then((data) => {
    console.log(data);
});
