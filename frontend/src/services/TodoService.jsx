import { api } from "./shared/base";

export const addToDoItem = async (userData) => {
  try {
    const response = await api.post("/todolist/additem", userData);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const fetchListTodos = async() => {
    try{
        const response = await api.get("/todolist/items");
        return response.data; 
    }catch(err){
        console.log("error occured fetching data", err);
        alert("Issue occured when fetching todoes");
    }
}

export const deleteTodoItem = async (id) => {
  try {
    const response = await api.delete(`/todolist/item/${id}`);
    console.log("Deleted todo response:", response);
    return response.data;
  } catch (err) {
    console.error("Error deleting todo:", err);
    throw err.response?.data || { message: "Failed to delete todo" };
  }
};

export const toggleTodoStatus = async (id) => {
  try {
    const response = await api.patch(`/todolist/item/${id}/toggle`);
    console.log("Toggled todo status response:", response);
    return response.data;
  } catch (err) {
    console.error("Error toggling todo status:", err);
    throw err.response?.data || { message: "Failed to toggle todo" };
  }
};
