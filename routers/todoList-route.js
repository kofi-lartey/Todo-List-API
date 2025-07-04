import { Router } from "express";
import { createList, deleteList, lists, singleList, updateList } from "../controllers/todoList-controller.js";
import { authenticate } from "../middleware/auth.js";


export const todoListRoute = Router();

// create a list
todoListRoute.post('/lists',authenticate,createList)

// get all list
todoListRoute.get('/lists',authenticate,lists) // GET /lists - will give you a maximum of 10 pages GET /lists?page=2 - will show you the next page which is starting from 11 - 20. GET /lists?page=1&limit=10 - so we saying in the first page you can give 10 pages to it and we can change 10 to 20 and it will give us 20 lists in a page.

// get a single list
todoListRoute.get('/lists',authenticate,singleList)

// update a list
todoListRoute.put('/lists/:id',authenticate,updateList)

// delete a list
todoListRoute.delete('/lists/:id',authenticate,deleteList)