import { Router } from "express";
import { createList, deleteList, lists, singleList, updateList } from "../controllers/todoList-controller.js";


export const todoListRoute = Router();

todoListRoute.post('/lists',createList)
todoListRoute.get('/lists',lists)
todoListRoute.get('/lists',singleList)
todoListRoute.put('/lists/:id',updateList)
todoListRoute.delete('/lists/:id',deleteList)