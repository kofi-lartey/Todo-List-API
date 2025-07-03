import { Router } from "express";
import { createList, deleteList, lists, singleList, updateList } from "../controllers/todoList-controller.js";
import { authenticate } from "../middleware/auth.js";


export const todoListRoute = Router();

todoListRoute.post('/lists',authenticate,createList)
todoListRoute.get('/lists',authenticate,lists)
todoListRoute.get('/lists',authenticate,singleList)
todoListRoute.put('/lists/:id',authenticate,updateList)
todoListRoute.delete('/lists/:id',authenticate,deleteList)