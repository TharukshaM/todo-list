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
