// All code is for testing purposes
import express from 'express';

const app = express();

const port = 9000;
app.listen(port, () => {
    console.log(`Server is running! ${port}`);
});
