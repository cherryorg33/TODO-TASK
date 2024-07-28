import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Todo = {
  _id?: number;
  title: string;
  description: string;
  createdAt?: Date;
};

const EditDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleUpdate: (e: React.FormEvent) => void;
}> = ({ isOpen, onClose, todo, handleChange, handleUpdate }) => {
  if (!isOpen) return null;

  const [edit , setedit] = useState({
    title: todo.title,
    description: todo.description,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const response =  await axios.patch(`/api/todo/${todo._id}`, edit);
      console.log(response)
      toast.success('Todo updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update todo!');
    }
  };

  useEffect(() => {
    setedit({...todo });
  }, [todo]);



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg mx-4 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={todo.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={todo.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<Todo>({
    title: '',
    description: '',
  });

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>({ title: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/todo', data);
      toast.success('Task Added Successfully');
      setData({ title: '', description: '' });
      getTodos();
    } catch (error) {
      console.log(error);
      toast.error('Failed to add task');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/todo/${currentTodo._id}`, currentTodo);
      toast.success('Task Updated Successfully');
      setIsEditDialogOpen(false);
      getTodos();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update task');
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/todo/${id}`);
      toast.success('Task deleted successfully');
      getTodos();
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete task');
    }
  };

  const editTodo = (todo: Todo) => {
    setCurrentTodo(todo);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  const formatDate = (date: Date) => {
    const dates = new Date(date);
    return `${dates.getDate()}-${dates.getMonth() + 1}-${dates.getFullYear()}`;
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <div className='w-screen h-screen object-cover bg-center' style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/04/42/44/98/360_F_442449827_ispo2oI83ffX0TSax4Pgdd7xkqCA5ThA.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <Navbar />
        <div className="p-4">
          <form onSubmit={handleSubmit} className="mb-6 w-full max-w-lg mx-auto p-3 relative top-32 right-72">
            <div className="items-center justify-center ml-10">
              <h3 className='font-serif text-2xl underline text-amber-400'>ADD TODO</h3>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter your task title"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={data.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter your task description"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Add Todo
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Todo List</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-100">
            <div className="w-full md:w-1/12 text-center font-semibold">S.No</div>
            <div className="w-full md:w-2/12 text-lg font-medium">Title</div>
            <div className="w-full md:w-5/12 text-gray-600">Description</div>
            <div className="w-full md:w-2/12 text-gray-500">Time</div>
            <div className="w-full md:w-2/12 text-center md:text-right font-medium">Action</div>
          </div>
          {todos.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No todos available.</div>
          ) : (
            todos.map((todo, index) => (
              <div key={index} className="p-4 border-b flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="w-full md:w-1/12 text-center font-semibold">{index + 1}</div>
                <div className="w-full md:w-2/12 text-lg font-medium">{todo.title}</div>
                <div className="w-full md:w-5/12 text-gray-600">{todo.description}</div>
                <div className="w-full md:w-2/12 text-gray-500">{formatDate(todo.createdAt)}</div>
                <div className="w-full md:w-2/12 flex justify-center md:justify-end mt-2 md:mt-0">
                  <button
                    onClick={() => editTodo(todo)}
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id!)}
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseDialog}
        todo={currentTodo}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
