import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import TODOS from "./Model";

const router = Router();


// Add the todo
router.post('/todo',async(req:Request, res:Response, next:NextFunction) => {
    
    try {
        const { title, description } = req.body;
        const newTodo = await TODOS.create({ title, description });
        if (newTodo) {
            res.status(201).json(newTodo);
        } else {
            res.status(400).json({ message: 'Invalid todo data' });
        }
    } catch (error) {
        next(error);
    }
})


// Get all todos

router.get('/todos', async(req:Request, res:Response, next:NextFunction) => {
    try {
        const todos = await TODOS.find();
        if (todos.length>0) {
            res.json(todos);
        } else {
            res.status(404).json({ message: 'No todos found' });
        }
    } catch (error) {
        next(error);
    }
})


// update the todo
router.put('/todo/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const { id } = req.params;
        const updatedTodo = await TODOS.findByIdAndUpdate(id, req.body, { new: true });
        if(updatedTodo){
            res.json(updatedTodo);
        }else{
            res.status(404).json({ message: 'No todo found with that id' });
        }

    }
    catch(error){
        next(error);
    }
}
)


// delete the todo
router.delete('/todo/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const { id } = req.params;
        const deletedTodo = await TODOS.findByIdAndDelete(id);
        if(deletedTodo){
            res.json(deletedTodo);
        } else{
            res.status(404).json({ message: 'No todo found with that id' });
        }

    }
    catch(error){
        next(error);
    }
}
)



export default router