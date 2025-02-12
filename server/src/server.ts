import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { setupSwagger } from "./config/swagger";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", routes);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
