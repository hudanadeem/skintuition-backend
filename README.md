# Skintuition

## 🧴 Overview

**Skintuition** is an AI skincare ingredient analyzer that helps users quickly identify harmful and beneficial ingredients in their skincare products by uploading an image of an ingredient list.

Built for skincare enthusiasts, dermatology patients, and anyone looking to make informed, transparent skincare choices.

---

## ✨ Features

- Quiz to determine user's skin-type to get personalized analysis
- Upload an image of ingredient list to scan. (sample image in /assets/ingredients/)
- AI Categorizes ingredients as **Beneficial**, **Potential Irritants**, or **Harmful** based on your skin type.
- Clean, responsive, and user-friendly interface.

---

## 🛠 Tech Stack

<table> <tr> <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="30"/> React.js</td> <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" width="30"/> SCSS</td> </tr> <tr> <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="30"/> Node.js</td> <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="30"/> Express</td> </tr> <tr> <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" width="30"/> MySQL</td> <td><img src="https://img.shields.io/badge/Knex.js-FF5722?logo=knex&logoColor=white" height="20"/> Knex.js</td> </tr> <tr> <td><img src="https://img.icons8.com/color/48/artificial-intelligence.png" width="30"/> Gemini AI</td> <td><img src="https://img.icons8.com/ios-filled/50/image-file.png" width="30"/> OCR for Ingredient Scanning</td> </tr> </table>

---

## 📦 Repositories

- **Frontend:** [https://github.com/hudanadeem/skintuition](https://github.com/hudanadeem/skintuition)
- **Backend:** [https://github.com/hudanadeem/skintuition-backend](https://github.com/hudanadeem/skintuition-backend)

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js & npm
- MySQL

---

### 🖥️ Backend Setup (`skintuition-backend`)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hudanadeem/skintuition-backend.git
   cd skintuition-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create MySQL Database:**

   - Open MySQL and create a database named:
     ```
     skintuition
     ```

4. **Run migrations and seed the database:**

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the server:**

   ```bash
   npm run dev
   ```

---

### 💻 Frontend Setup (`skintuition`)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hudanadeem/skintuition.git
   cd skintuition
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

---
