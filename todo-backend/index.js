import express from "express";
import { connectDb } from "./db.connect.js";
import todoRoutes from "./todo/todo.routes.js";
import userRoutes from "./user/user.routes.js";
import cors from "cors";

const app = express();

// make app understand json
app.use(express.json());
app.use(cors());

// connect db
connectDb();

// register routes
app.use(todoRoutes);
app.use(userRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
