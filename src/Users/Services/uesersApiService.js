import axios from "axios";
const apiUrl = "https://localhost:7267/Users";


export const login = async (userLogin) => {
  try {
    const response = await axios.post(apiUrl + "/login", userLogin);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(apiUrl + "/signUp", normalizedUser);
    return data;    
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserData = async (id) => {
  try {
    const { data } = await axios.get(apiUrl + "/" + id);
    return data;
  } catch (error) {
    console.error("❌ Error in getUserData:", error);
    throw new Error(error.message);
  }
};

export const editUser = async (id, normalaizedUser, currentPassword = "") => {
  try {
    const { data } = await axios.put(`${apiUrl}/${id}?currentPassword=${currentPassword}`, normalaizedUser);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


 export const changePassword = async (id, passwords) => {
  const { data } = await axios.put(`${apiUrl}/${id}`, passwords);
  return data;
};
