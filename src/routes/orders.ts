import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://orders-service:6000/api/orders", req.body);
    res.json(response.data);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Error creando pedido en orders-service ${err}` });
  }
});


router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://orders-service:6000/api/orders");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: `Error conectando a orders-service ${err}`});
  }
});

export default router;