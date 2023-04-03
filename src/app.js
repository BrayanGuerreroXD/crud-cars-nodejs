import express from "express";
import carsRoutes from "../routes/cars.routes.js";
const app = express();

app.use(express.json());

app.use("/api/", carsRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

export default app