# 💾 Disk Scheduling Visualizer

An interactive web application to simulate and visualize **disk scheduling algorithms** with smooth animations and real-time graph plotting.

---

## 🚀 Features

* 📌 Supports multiple algorithms:

  * FCFS (First Come First Serve)
  * SSTF (Shortest Seek Time First)
  * SCAN
  * C-SCAN
  * LOOK
  * C-LOOK

* 🎯 Interactive input:

  * Custom request queue
  * Head position
  * Direction (LEFT / RIGHT)

* 📊 Visual representation:

  * Zig-zag disk head movement graph
  * Smooth animated head traversal
  * Axis with dynamic values

* 🧠 Smart UI:

  * Prevents overlapping axis labels
  * Responsive design (mobile + desktop)
  * Hover on points → shows track value

* 💾 Backend integration:

  * Save simulation results to database
  * View history of previous runs

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📂 Project Structure

```
client/
 ├── src/
 │   ├── components/
 │   │   ├── InputForm.jsx
 │   │   ├── AlgorithmSelector.jsx
 │   │   ├── Graph.jsx
 │   │   └── ResultDisplay.jsx
 │   ├── pages/
 │   │   ├── Simulator.jsx
 │   │   └── History.jsx
 |   ├── services/
 │   │   ├── api.js
 │   ├── App.jsx
 │   └── main.jsx

backend/
 │   ├── config/
 │   │   ├── db.js
 │   ├── controllers/
 │   │   ├── simulatorController.js
 │   ├── models/
 │   │   ├── Simulation.js
 │   ├── routes/
 │   │   ├── historyRoutes.js
 │   │   └── simulationRoutes.js
 |   ├── services/
 │   │   ├── diskAlgorithms.js
 │   └── server.js
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/disk-scheduling-visualizer.git
cd disk-scheduling-visualizer
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
PORT=5000
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm run dev
```

---

## 📊 How It Works

1. User enters disk request queue and head position
2. Selects algorithm
3. Backend computes:

   * Seek sequence
   * Total seek time
4. Frontend:

   * Displays result
   * Animates head movement
   * Draws graph

---

## 🎥 Demo Flow

1. Enter: `82, 170, 43, 140, 24, 16, 190`
2. Head: `50`
3. Algorithm: `SCAN`
4. Click **Run Simulation**
5. Watch animated graph 🚀

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Developed by **Vinay**

---

## ⭐ Show Support

If you like this project, give it a ⭐ on GitHub!