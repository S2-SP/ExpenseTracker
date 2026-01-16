import axios from 'axios';

const API_BASE_URL = 'http://localhost:5224/api/Expense';

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  isTravel?: boolean;
};

export type ExpenseRequest = {
  amount: number;
  category: string;
  date: string;
  description?: string;
  isTravel?: boolean;
};

export const fetchAllExpenses = async () => {
  try{
    const response = await axios.get(API_BASE_URL);
    return response.data;
  }catch(error){
    console.error("Error fetching expenses:", error);
  } 
}

export const fetchExpenseById = async (id: string) => {
    try{
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    }catch(error){
      console.error("Error fetching expense by ID:", error);
    };
}  

export const addExpense = async (expense: ExpenseRequest) => {
  try{
    const response = await axios.post(API_BASE_URL, expense);
    return response.data;
  }catch(error){
      console.error("Error adding expense:", error);
      throw error;
  };
  }

export const deleteExpense = async (id: string) => {
  try{
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }catch(error){
      console.error("Error deleting expense:", error);
  };
}

export const updateExpense = async (id: string, expense: ExpenseRequest) => {
  try{
    const response = await axios.put(`${API_BASE_URL}/${id}`, expense);
    return response.data;
  }catch(error){
      console.error("Error updating expense:", error);
      throw error;
  };
}   
 
export const fetchDailyExpenses = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/daily`);
    return response.data;
  }catch(error){
      console.error("Error fetching daily expenses:", error);
  };
}
export const fetchMonthlyExpenses = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/monthly`);
    return response.data;
  }catch(error){
    console.error("Error fetching monthly expenses:", error);
  };
}

export const fetchAnnualExpenses = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/annual`);
    return response.data;
  }catch(error){
    console.error("Error fetching annual expenses:", error);
  };
}
export const fetchTravelExpenses = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/travel`);
    return response.data;
  }catch(error){
    console.error("Error fetching travel expenses:", error);
  };
}