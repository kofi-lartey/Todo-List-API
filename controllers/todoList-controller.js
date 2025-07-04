import { TodoList } from "../models/todoList-models.js";
import { todoListSchema } from "../schemas/todoList-schema.js"

export const createList = async (req, res) => {
    try {
        const userID = req.user.id;
        // validate with joi
        const { error, value } = todoListSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        if (userID.toString() !== value.user.toString()) {
            return res.status(403).json({ message: 'You are not authorized to create a list for this user' })
        }
        // create your Todo list
        const createTodoListData = await TodoList.create(value)
        console.log('New list', createTodoListData)
        return res.status(202).json({ message: 'Your List is Successfully created🎉' })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
};

// get all list with a limit of 10 lists per a page
export const lists = async (req, res) => {
    try {
        const userID = req.user.id;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        // find all List created by the user with a limited number like 10 per a page.
        const allLists = await TodoList.find(
            { user: userID })
            .skip(skip)
            .limit(limit);
        // count the number of document(list) a user has
        const totalCount = await TodoList.countDocuments({ user: userID })

        // this gives a number of list (10) to a page
        const totalPages = Math.ceil(totalCount / limit);

        // return a message if there is no list
        if (allLists.length == 0) {
            return res.status(400).json({ message: 'You have no list' })
        };

        return res.status(200).json({
            message: `These are all your List`,
            lists: allLists,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    };
};

export const singleList = async (req, res) => {
    try {
        // check the id 
        const listID = req.params.id;
        const userID = req.user.id;
        if (!listID) {
            return res.status(400).json({ message: `List ID: ${listID}, not available` });
        }
        // check the availablity of that list
        const list = await TodoList.findById(listID);
        if (!list) {
            return res.status(400).json({ message: 'Invalid List' })
        }
        // check if list belong to the user
        if (list.user.toString() !== userID.toString()) {
            return res.status(403).json({ message: 'You are not authorized to see a list for this user' })
        }
        return res.status(200).json({ message: 'List is Found', singleList: list },);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    };
};

export const updateList = async (req, res) => {
    try {
        const userID = req.user.id;
        // check the id 
        const listID = req.params.id;
        if (!listID) {
            return res.status(400).json({ message: `List ID: ${listID}, not available` });
        }
        // check the availablity of that list
        const list = await TodoList.findById(listID);
        if (!list) {
            return res.status(400).json({ message: 'Invalid List' })
        }
        // check if list belong to the user
        if (list.user.toString() !== userID.toString()) {
            return res.status(403).json({ message: 'You are not authorized to see a list for this user' })
        }
        // upadate a list
        const newList = await TodoList.findByIdAndUpdate(
            listID,
            req.body,
            { new: true }
        );
        return res.status(200).json({ message: 'List is updated Successfully', udateList: newList });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    };
};

export const deleteList = async (req, res) => {
    try {
        const userID = req.user.id;
        // check the id 
        const listID = req.params.id;
        if (!listID) {
            return res.status(400).json({ message: `List ID: ${listID}, not available` });
        }
        // check the availablity of that list
        const list = await TodoList.findById(listID);
        if (!list) {
            return res.status(400).json({ message: 'Invalid List' })
        }
        // check if list belong to the user
        if (list.user.toString() !== userID.toString()) {
            return res.status(403).json({ message: 'You are not authorized to see a list for this user' })
        }
        // delete a list
        const newList = await TodoList.findByIdAndDelete(listID);
        return res.status(200).json({ message: 'List is Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    };
};