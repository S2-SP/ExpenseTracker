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

export const fetchDailyExpenses = async () => {
  const response = await axios.get(`${API_BASE_URL}/daily`);
  return response.data;
}
export const fetchMonthlyExpenses = async () => {
    const response = await axios.get(`${API_BASE_URL}/monthly`);
    return response.data;
    }
export const addExpense = async (expense: { amount: number; category: string; date: string; description?: string }) => {
  const response = await axios.post(API_BASE_URL, expense);
  return response.data;
}

export const deleteExpense = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
}

export const updateExpense = async (id: string, expense: { amount: number; category: string; date: string; description?: string }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, expense);
  return response.data;
}   
export const fetchExpenseById = async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
}   
export const fetchAllExpenses = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
}

export const fetchAnnualExpenses = async () => {
    const response = await axios.get(`${API_BASE_URL}/annual`);
    return response.data;
}
export const fetchTravelExpenses = async () => {
    const response = await axios.get(`${API_BASE_URL}/travel`);
    return response.data;
}