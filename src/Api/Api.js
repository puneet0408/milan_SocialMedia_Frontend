import axios from "axios";

const BASE_URl = "http://localhost:8080";

export const fetchDetailsFromApi = async (url) => {
  try {
    const { data } = await axios.get(BASE_URl + url);
    return data;
  } catch (error) {
    return error;
  }
};

export const AddFeed = async (url, formData) => {
  try {
    const { data } = await axios.post(BASE_URl + url, formData);
    return data;
  } catch (error) {
    return error;
  }
};

export const SignupLogin = async (url, user) => {
  try {
    const data = await axios.post(BASE_URl + url, user);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getuserdetails = async (url) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };
  try {
    const { data } = await axios.get(BASE_URl + url, {
      headers,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateFeed = async (url, formData) => {
  try {
    const res = await axios.patch(BASE_URl + url, formData);
    return res;
  } catch (error) {
    error;
    return error;
  }
};

export const updateUser = async (url, user) => {
  try {
    const res = await axios.patch(BASE_URl + url, user, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  } catch (error) {
    error;
    return error;
  }
};

export const removeItemFromDb = async (url) => {
  try {
    const res = await axios.delete(url);
    return res;
  } catch (error) {
    error;
    return error;
  }
};
