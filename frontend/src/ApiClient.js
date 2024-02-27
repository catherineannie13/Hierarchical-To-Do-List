import axios from './axiosConfig';

const API_BASE_URL = 'http://localhost:5000';

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) { 
    throw error.response.data;
  }
};

const logout = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getLists = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lists`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
const createList = async (listData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/lists`, listData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};
  
const updateList = async (listId, listData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/lists/${listId}`, listData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};
  
const deleteList = async (listId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/lists/${listId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};


const getItems = async (listId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lists/${listId}/items`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};
  
const createItem = async (listId, itemData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/lists/${listId}/items`, itemData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};
  
const updateItem = async (listId, itemId, itemData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/lists/${listId}/items/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};
  
const deleteItem = async (listId, itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/lists/${listId}/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

const markItemAsComplete = async (listId, itemId, completed) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/lists/${listId}/items/${itemId}/complete`, { completed });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
const moveItem = async (fromListId, itemId, toListId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/lists/${fromListId}/items/${itemId}/move`, { to_list_id: toListId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export { register, login, logout, getLists, createList, updateList, deleteList, getItems, createItem, updateItem, deleteItem, markItemAsComplete, moveItem };
