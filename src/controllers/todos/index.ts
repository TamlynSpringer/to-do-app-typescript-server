import { Response, Request } from 'express';
import { ITodo } from '../../types/todo';
import Todo from '../../models/todo';


const getTodosFromDB = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({ todos })
  } catch (error) {
    throw error
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  try {
    const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    })
    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    res
      .status(201)
      .json({ message: 'Todo added', todo: newTodo, todos: allTodos })
  } catch (error) {
    throw error
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    )
    const allTodos: ITodo[] = await Todo.find()
    res
      .status(200)
      .json({
        message: 'Todo updated',
        todo: updatedTodo,
        todos: allTodos,
      })
  } catch (error) {
    throw error
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    )
    const allTodos: ITodo[] = await Todo.find()
    res
      .status(200)
      .json({
        message: 'Todo deleted',
        todo: deletedTodo,
        todos: allTodos,
      })
  } catch (error) {
    throw error
  }
};

export { getTodosFromDB, addTodo, updateTodo, deleteTodo };