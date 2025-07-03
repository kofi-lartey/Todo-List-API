import { model, Schema } from "mongoose";
import normalize from "normalize-mongoose";


export const todoListmodel = new Schema({
    titel:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    completion:{
        type: Boolean,
        default: false
    },
    dueDate:{
        type: Date,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
},{timestamps:true})

todoListmodel.plugin(normalize);
export const TodoList = model('TodoList',todoListmodel);