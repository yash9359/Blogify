# 📝 Blogify

Blogify is a **production-ready blogging platform** built with **Node.js, Express, MongoDB, and EJS**, featuring **Cloudinary-based image uploads** to ensure images are safe across deployments.

---

## 🚀 Features

* 🔐 User authentication
* 📝 Create and view blog posts
* 🖼️ Upload blog cover images (Cloudinary)
* 💬 Comment system on blogs
* 👤 Author details with profile image
* 📄 Server-side rendering using EJS
* ☁️ Deployment-safe image storage (Render friendly)

---

## 🧱 Tech Stack

| Layer        | Technology          |
| ------------ | ------------------- |
| Backend      | Node.js, Express    |
| Database     | MongoDB (Mongoose)  |
| Frontend     | EJS Templates       |
| Image Upload | Multer + Cloudinary |
| Hosting      | Render              |

---

## 📂 Project Structure

```
Blogify/
├── config/              # Cloudinary & other configs
├── models/              # Mongoose schemas (User, Blog, Comment)
├── routes/              # Express routes
├── middleware/          # Upload & auth middleware
├── views/               # EJS templates
├── public/              # Static assets
├── app.js               # App entry point
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yash9359/Blogify.git
cd Blogify
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## ▶️ Run the Project

```bash
npm start
```

or (development)

```bash
nodemon app.js
```

---

## 🖼️ Image Upload System (Cloudinary)

Images are **not stored on the server disk**.
Instead, they are uploaded directly to **Cloudinary**, and only the image URL is stored in MongoDB.

### Why Cloudinary?

* Render uses **ephemeral storage**
* Local images get deleted on redeploy
* Cloudinary keeps images **permanent & CDN-served**

### How it works:

```
Form → Multer → Cloudinary → Image URL → MongoDB
```

Example stored URL:

```
https://res.cloudinary.com/your_name/image/upload/blogify/xyz.jpg
```

---

## 🧠 Key Routes

### Create Blog

```
POST /blog
```

### View Blog

```
GET /blog/:id
```

### Add Comment

```
POST /blog/comment/:blogId
```

---

## 🖥️ EJS Example

```ejs
<img src="<%= blog.coverImageURL %>" alt="Blog Cover" />

<img 
  src="<%= blog.createdBy.profileImageURL || '/images/default-user.png' %>" 
  alt="Author"
/>
```

---

## 🚀 Deployment Notes

* Hosted on **Render**
* Images stored on **Cloudinary**
* Safe from redeploy data loss
* Production-ready architecture

---

## 🔮 Future Improvements

* ✏️ Edit & replace blog images
* 🗑️ Delete blog + Cloudinary cleanup
* ❤️ Likes & reactions
* 📱 UI/UX enhancements
* 🔍 Search & pagination

---

## 👨‍💻 Author

**Yash**
GitHub: [https://github.com/yash9359](https://github.com/yash9359)

---

## ⭐ Final Note

This project demonstrates **real-world backend practices**, including:

* Cloud storage integration
* Secure deployments
* Clean MVC structure

Feel free to fork, improve, or use it as a learning reference 🚀
