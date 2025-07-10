# 🎓 College Appointment Booking API

A role-based backend system where **students** can book time slots with **professors**, and professors can manage their availability and appointments.

Built as part of an engineering internship assignment to simulate a real-world backend project using industry-standard practices.

---

## 📌 Tech Stack

- **Node.js + Express** – Backend Framework
- **MongoDB + Mongoose** – Database & ODM
- **JWT + Cookies** – Authentication
- **Zod** – Input Validation
- **Jest + Supertest** – E2E Testing
- **Dotenv** – Environment Configuration

---

## ✅ Features

### 🔐 Authentication
- `POST /user/signup` – Register as a student or professor  
- `POST /user/signin` – Login & receive JWT token (stored in cookies)

### 👨‍🏫 Professor APIs
- `POST /professor/slots` – Create available time slots
- `GET /professor/slots` – View own slots
- `DELETE /professor/slots/:id` – Delete a slot
- `GET /professor/appointments` – View all booked appointments
- `DELETE /professor/appointments/:id` – Cancel a booked appointment

### 🎓 Student APIs
- `GET /student/professor/:id/slots` – View available slots for a professor
- `POST /student/slots/:id/book` – Book a slot
- `GET /student/appointments` – View own appointments

---

## 🧪 E2E Test Case

A complete flow is covered in `__tests__/e2e.test.js`:

1. Student A1 logs in  
2. Professor P1 logs in and creates 2 time slots  
3. Student A1 views & books one slot  
4. Student A2 logs in & books the second slot  
5. Professor P1 cancels A1’s appointment  
6. Student A1 checks and sees no pending appointments

Run with:

```bash
npm test
```

---

## 🗂 Folder Structure

```
.
├── app.js
├── server.js
├── /controllers
├── /routes
├── /models
├── /middlewares
├── /validators
├── /utils
├── /__tests__      # Contains the E2E test
├── .env
```

---

## 📁 .env Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your-secret
```

---

## 📹 Demo (Optional)

You can add a link to a Loom / YouTube video walk-through here once you record it.

---

## 🧠 Notes

- Focused on **clean schema design** using normalized references.
- Backend fully modular with clear **separation of concerns**.
- Validations handled using **Zod** with custom error flattener.
- Auth is cookie-based for realism in session handling.

---

## 🤝 Author

**Sahil Rochlani**  
Built as part of a backend internship assignment.  
Twitter: [@SahilRochlani](https://x.com/RebootedDev2058)
