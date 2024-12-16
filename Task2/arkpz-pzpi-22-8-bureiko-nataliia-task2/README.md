### Специфікація API для системи

#### Загальна інформація:
- **База даних**: MongoDB Atlas (підключення через `MongoClient`).
- **Фреймворк**: Node.js + Express.js.
- **Аутентифікація**: JSON Web Token (JWT).
- **Middleware**: CORS, обробка JSON, завантаження файлів (Multer), перевірка токенів (JWT).

---

### Аутентифікація

#### **POST /admins/login**
- **Опис**: Вхід адміністратора.
- **HTTP-метод**: POST.
- **URL**: `/admins/login`.
- **Заголовки**:
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Тіло запиту**:
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Приклад відповіді (успіх)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Приклад відповіді (помилка)**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```
- **Коди статусу**:
  - `200 OK`: Успішна автентифікація.
  - `401 Unauthorized`: Невірні дані для входу.

---

### Middleware

#### **Перевірка токена (authMiddleware.js)**:
- **Опис**: Перевіряє, чи передано дійсний JWT-токен у заголовках `Authorization`.
- **Коди відповіді**:
  - `401 Unauthorized`: Токен не передано.
  - `403 Forbidden`: Токен недійсний.

---

### CRUD-операції для ресурсів

#### **GET /products**
- **Опис**: Отримання списку всіх продуктів.
- **HTTP-метод**: GET.
- **Заголовки**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Приклад відповіді**:
  ```json
  [
    {
      "id": "1",
      "name": "Product A",
      "price": 100
    },
    {
      "id": "2",
      "name": "Product B",
      "price": 150
    }
  ]
  ```
- **Коди статусу**:
  - `200 OK`: Успішний запит.
  - `401 Unauthorized`: Токен відсутній або недійсний.

#### **POST /products**
- **Опис**: Створення нового продукту.
- **HTTP-метод**: POST.
- **Тіло запиту**:
  ```json
  {
    "name": "New Product",
    "price": 200
  }
  ```
- **Коди статусу**:
  - `201 Created`: Продукт створено.
  - `400 Bad Request`: Неправильні дані.

---

### Підключення до бази даних

#### **connect.js**:
- **Функції**:
  - `connectToServer`: Встановлює з'єднання з базою `PromotionSystem`.
  - `getDb`: Повертає поточне з'єднання до бази даних.

---

### Основний файл сервера

#### **server.js**:
- **Модулі**:
  - Підключення до маршрутів: `productRoutes`, `adminRoutes`, `quizRoutes`, тощо.
  - Middleware: CORS, JSON, Multer.
- **Запуск сервера**:
  ```javascript
  app.listen(PORT, () => {
      connect.connectToServer()
      console.log("Server is running")
  })
  ```

---
