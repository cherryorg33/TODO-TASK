import express from 'express';
import mongoose from 'mongoose';
import Todo from './Controller';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());


const server =async()=>{
    try{
       const database = await mongoose.connect('mongodb://localhost/todo')
       if(database){
        console.log('Connected to the database');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
       }

    }catch(error){
        console.error(error);
        process.exit(1);
    }
}     

server()

app.use('/api', Todo);



export default app
