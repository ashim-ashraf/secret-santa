import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";
import fileUpload from "express-fileupload";
import { setupSwagger } from "./docs/swagger";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error-handler";

// Load environment variables
dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());

//Routes
app.use("/", routes);

setupSwagger(app);

app.use(errorMiddleware);

export default app;