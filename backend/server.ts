// All code is for testing purposes only

import "firebase/database";
import cong from "./firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
const database = getDatabase(cong);
const collectionRef = ref(database, "users");

const fetchData = () => {
    onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();
        if (dataItem) {
            // Convert the object values into an array
            const displayItem= Object.values(dataItem);
            displayItem.forEach((item) => {
                console.table(item);
            });
        }
    });
};

//Uncomment to test
// fetchData();