import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://product-management-service:5000/api/products");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: `Error conectando a product-management-service ${err}`});
  }
});


router.post("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://product-management-service:5000/api/products", req.body);
    res.json(response.data);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Error creando compra en product-management-service ${err}` });
  }
});

export default router;