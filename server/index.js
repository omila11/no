import e from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = e()

app.use(cors())
app.use("/api/auth", authRoutes)


app.listen(5000, () => {
    console.log("Server is running ");
})