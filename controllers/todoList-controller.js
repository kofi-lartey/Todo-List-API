import { TodoList } from "../models/todoList-models.js";
import { todoListSchema } from "../schemas/todoList-schema.js"

export const createList = async(req,res) =>{
    try {
        // validate with joi
        const {error,value} = todoListSchema.validate(req.body);
        if(error) {
            return res.status(400).json({message:error.details[0].message})
        }
        // create your Todo list
        const createTodoListData = await TodoList.create(value)
        return res.status(200).json({message:'Your List is Successfully created🎉'})

    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
};

export const lists = async(req,res) =>{
    try {
        // find all List created
        const allList = await TodoList.find();
        // return a message if there is no list
        if(allList == ''){
            return res.status(400).json({message:'You have no list'})
        };
        return res.status(200).json(
            {message:`These are all your List`},
            allList
        );
    } catch (error) {
        return res.status(500).json({message:error.message})
    };
};

export const singleList = async(req, res) =>{
    try {
        // check the id 
        const listID = req.params.id;
        if(!listID){
            return res.status(400).json({message:`List ID: ${listID}, not available`});
        }
        // check the availablity of that list
        const list = await TodoList.findById(listID);
        if(!list){
            return res.status(400).json({message:'Invalid List'})
        }
        return res.status(200).json(
            {message:'List is Found'},
            list
        );
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    };
};

export const updateList = async(req, res) =>{
    try {
        // check the id 
        const listID = req.params.id;
        if(!listID){
            return res.status(400).json({message:`List ID: ${listID}, not available`});
        }
        // check the availablity of that list
        const list = await TodoList.findById(listID);
        if(!list){
            return res.status(400).json({message:'Invalid List'})
        }
        // upadate a list
        const newList = await TodoList.findByIdAndUpdate(
            req.body,
            {new:true}
        );
        return res.status(200).json(
            {message:'List is updated Successfully'},
            newList
        );
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    };
};

export const deleteList = async(req, res) =>{
    try {
        // check the id 
        const listID = req.params.id;
        if(!listID){
            return res.status(400).json({message:`List ID: ${listID}, not available`});
        }
        // check the availablity of that list
        const list = await TodoList.findById(listID);
        if(!list){
            return res.status(400).json({message:'Invalid List'})
        }
        // upadate a list
        const newList = await TodoList.findByIdAndDelete(listID);
        return res.status(200).json(
            {message:'List is Deleted Successfully'},
            newList
        );
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    };
};