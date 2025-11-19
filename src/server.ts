import app from "./app";
import userRouter from "./routes/users";
import productRouter from "./routes/products";
import orderRouter from "./routes/orders";
import { loadSwaggerDocs } from "./swagger/swaggerDocs";

const PORT = process.env.PORT || 3000;

loadSwaggerDocs();

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);

app.listen(PORT, () => {
  console.log("Main service corriendo en http://localhost:3000");
});
