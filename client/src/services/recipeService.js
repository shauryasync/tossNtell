import api from "./api";

export const getRecipes = async (params = {}) => {
  const { data } = await api.get("/recipes", {
    params,
  });

  return data;
};

export const getRecipeById = async (id) => {
  const { data } = await api.get(`/recipes/${id}`);

  return data;
};

export const createRecipe = async (formData) => {
  const { data } = await api.post("/recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateRecipe = async (id, formData) => {
  const { data } = await api.put(`/recipes/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteRecipe = async (id) => {
  const { data } = await api.delete(`/recipes/${id}`);

  return data;
};
