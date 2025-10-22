import express from "express";
import { connectDB } from "./dbConfig/db";
import { sequelize } from "./dbConfig/db";
import { Order } from "./models/order";
import router from "./routes/orderRoutes";

const app = express();
app.use(express.json());
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));


app.use("/orders", router)

const PORT = 8000;

app.listen(PORT, async () => {
  await connectDB();
  await sequelize.sync({ alter: true }); 
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
