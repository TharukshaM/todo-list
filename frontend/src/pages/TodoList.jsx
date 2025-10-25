import { useState, useEffect } from "react";
import { Trash2, Edit2, Check, X, Plus, CheckCircle2 } from "lucide-react";
import {addToDoItem, fetchListTodos} from "../services/TodoService";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(()=>{
    fetchToDoList();
  },[]);

  const fetchToDoList = async() => {

    const todos = await fetchListTodos();
    if(todos) {
        setTodos(todos);
    }

  }

  const addTodo = async () => {
    if (!formData.title.trim()) {
      setTitleError(true);
      return;
    }

    const response = await addToDoItem(formData);
    if (response) {
      console.log("Todo item added:", response);
    }
    // Reset the form
    setFormData({ title: "", description: "" });
    setTitleError(false);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editValue } : todo
        )
      );
      setEditingId(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const activeTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Animated Illustration */}
      <div className="lg:w-1/2 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden flex items-center justify-center p-8 lg:p-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-white opacity-10 rounded-full -bottom-40 -right-40 animate-pulse delay-700"></div>
          <div className="absolute w-64 h-64 bg-white opacity-5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
        </div>

        {/* Floating Task Cards Animation */}
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              STAY ORGANIZED
            </h1>
            <p className="text-xl text-white opacity-90">
              Manage your tasks with <b>Task Manager</b>
            </p>
          </div>

          {/* Animated Floating Cards */}
          <div className="space-y-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition animate-float">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-400"></div>
                <div className="flex-1 h-3 bg-white bg-opacity-50 rounded"></div>
                <div className="w-5 h-5 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition animate-float-delay-1">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-400"></div>
                <div className="flex-1 h-3 bg-white bg-opacity-50 rounded"></div>
                <div className="w-5 h-5 rounded-full bg-blue-400"></div>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition animate-float-delay-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-400"></div>
                <div className="flex-1 h-3 bg-white bg-opacity-50 rounded line-through"></div>
                <div className="w-5 h-5 rounded-full bg-green-400"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-6 justify-center">
            <div className="text-center">
              <div className="text-white opacity-75 text-m">Active</div>
              <div className="text-4xl font-bold text-white">{activeTodos}</div>
            </div>
            <div className="w-px bg-white opacity-30"></div>
            <div className="text-center">
              <div className="text-white opacity-75 text-m">Done</div>
              <div className="text-4xl font-bold text-white">
                {completedTodos}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-float-delay-1 {
            animation: float 3s ease-in-out infinite;
            animation-delay: 0.5s;
          }
          .animate-float-delay-2 {
            animation: float 3s ease-in-out infinite;
            animation-delay: 1s;
          }
        `}</style>
      </div>
      <div className="lg:w-1/2 bg-gray-50 p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex justify-center flex-col items-center text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Today's Tasks
            </h2>
            <p className="text-gray-600">What do you want to accomplish?</p>
          </div>

          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 flex flex-raw">
            <div className="flex gap-3 flex-col w-[75%]">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (titleError && e.target.value.trim()) setTitleError(false);
                }}
                placeholder="Task title"
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition text-gray-800 focus:outline-none ${
                  titleError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-purple-500"
                }`}
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Task description (optional)..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition text-gray-800"
              />
              {titleError && (
                <div className="text-red-500 text-sm  ml-1">
                  * Title is required!
                </div>
              )}
            </div>
            <div className="w-[25%] flex justify-center items-center">
              <button
                onClick={addTodo}
                className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2 font-medium"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-16">
                <CheckCircle2
                  size={64}
                  className="mx-auto text-gray-300 mb-4"
                />
                <p className="text-xl text-gray-400">
                  No tasks yet. Start adding some!
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 group"
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className={`shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition transform hover:scale-110 ${
                        todo.completed
                          ? "bg-linear-to-r from-green-400 to-green-500 border-green-500"
                          : "border-gray-300 hover:border-purple-400"
                      }`}
                    >
                      {todo.completed && (
                        <Check
                          size={18}
                          className="text-white"
                          strokeWidth={3}
                        />
                      )}
                    </button>

                    {/* Todo Text */}
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && saveEdit(todo.id)
                        }
                        className="flex-1 px-3 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:border-purple-500 text-gray-800"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`flex-1 text-lg ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700 font-medium"
                        }`}
                      >
                        {todo.title}
                      </span>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      {editingId === todo.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(todo.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Save"
                          >
                            <Check size={20} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            title="Cancel"
                          >
                            <X size={20} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(todo)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Progress Bar */}
          {todos.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 font-medium">Progress</span>
                <span className="text-gray-800 font-bold">
                  {todos.length > 0
                    ? Math.round((completedTodos / todos.length) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      todos.length > 0
                        ? (completedTodos / todos.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
