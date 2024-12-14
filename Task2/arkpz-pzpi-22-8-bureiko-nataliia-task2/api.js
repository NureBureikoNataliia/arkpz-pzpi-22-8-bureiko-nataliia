import axios from "axios";

const URL = "http://localhost:3000";

// Products
export async function getProducts() {
  const response = await axios.get(`${URL}/products`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getProduct(id) {
  const response = await axios.get(`${URL}/products/${id}`);

  const product = response.data;
  const data = await getImage(product.imageId);
  product.image = data;
  return product;
}

export async function createProduct(product) {
  const data = await createImage(product.file);

  console.log(product);
  const imageId = product.file.name;

  product.imageId = imageId;

  const response = await axios.post(`${URL}/products`, product);
  return response;
}

export async function updateProduct(id, product) {
  let updatedProduct = { ...product };

  // Перевірка наявності нового файлу
  if (product.file) {
    const imageId = await createImage(product.file);
    updatedProduct.imageId = imageId;
  } else {
    // Якщо файл не передано, зберігаємо старий imageId
    const existingProduct = await getProduct(id);
    updatedProduct.imageId = existingProduct.imageId;
  }

  delete updatedProduct.file;

  const response = await axios.put(`${URL}/products/${id}`, updatedProduct);
  return response;
}

export async function deleteProduct(id) {
  const response = await axios.delete(`${URL}/products/${id}`);
  return response;
}

// Admins
export async function getAdmins() {
  const response = await axios.get(`${URL}/admins`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getAdmin(id) {
  const response = await axios.get(`${URL}/admins/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function updateAdmin(id, admin) {
  const response = await axios.put(`${URL}/admins/${id}`, admin);
  return response;
}

export async function deleteAdmin(id) {
  const response = await axios.delete(`${URL}/admins/${id}`);
  return response;
}

//schould be deleted later
export async function createAdmin(admin) {
  const response = await axios.post(`${URL}/admins`, admin);

  return response;
}

export async function verifyAdmin(admin) {
  const response = await axios.post(`${URL}/admins/login`, admin);

  if (response.data.success) {
    return response.data.token;
  } else {
    return;
  }
}

// Quizzes
export async function getQuizzes() {
  const response = await axios.get(`${URL}/quizzes`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getQuiz(id) {
  const response = await axios.get(`${URL}/quizzes/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createQuiz(quiz) {
  const response = await axios.post(`${URL}/quizzes`, quiz);
  return response;
}

export async function updateQuiz(id, quiz) {
  const response = await axios.put(`${URL}/quizzes/${id}`, quiz);
  return response;
}

export async function deleteQuiz(id) {
  const response = await axios.delete(`${URL}/quizzes/${id}`);
  return response;
}

// Questions
export async function getQuestions() {
  const response = await axios.get(`${URL}/questions`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getQuestion(id) {
  const response = await axios.get(`${URL}/questions/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createQuestion(question) {
  const response = await axios.post(`${URL}/questions`, question);
  return response;
}

export async function updateQuestion(id, question) {
  const response = await axios.put(`${URL}/questions/${id}`, question);
  return response;
}

export async function deleteQuestion(id) {
  const response = await axios.delete(`${URL}/questions/${id}`);
  return response;
}

// Answers
export async function getAnswers() {
  const response = await axios.get(`${URL}/answers`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getAnswer(id) {
  const response = await axios.get(`${URL}/answers/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createAnswer(answer) {
  const response = await axios.post(`${URL}/answers`, answer);
  return response;
}

export async function updateAnswer(id, answer) {
  const response = await axios.put(`${URL}/answers/${id}`, answer);
  return response;
}

export async function deleteAnswer(id) {
  const response = await axios.delete(`${URL}/answers/${id}`);
  return response;
}

// Categories
export async function getCategories() {
  const response = await axios.get(`${URL}/categories`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getCategory(id) {
  const response = await axios.get(`${URL}/categories/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createCategory(category) {
  const response = await axios.post(`${URL}/categories`, category);
  return response;
}

export async function updateCategory(id, category) {
  const response = await axios.put(`${URL}/categories/${id}`, category);
  return response;
}

export async function deleteCategory(id) {
  const response = await axios.delete(`${URL}/categories/${id}`);
  return response;
}

// Priorities
export async function getPriorities() {
  const response = await axios.get(`${URL}/priorities`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getPriority(id) {
  const response = await axios.get(`${URL}/priorities/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createPriority(priority) {
  const response = await axios.post(`${URL}/priorities`, priority);
  return response;
}

export async function updatePriority(id, priority) {
  const response = await axios.put(`${URL}/priorities/${id}`, priority);
  return response;
}

export async function deletePriority(id) {
  const response = await axios.delete(`${URL}/priorities/${id}`);
  return response;
}

export async function createImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post(`${URL}/images`, formData, {
    headers: {
      "Cobtent-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function getImage(id) {
  const response = await axios.get(`${URL}/images/${id}`);
  return response;
}
