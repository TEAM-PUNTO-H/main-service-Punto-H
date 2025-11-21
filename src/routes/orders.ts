import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://orders-service:6000/api/orders", req.body);
    res.status(response.status).json(response.data);

  } catch (error: any) {
    const backendError = error.response;
    if (backendError) {
      res.status(backendError.status).json(backendError.data);
    }
    else {
      res.status(500).json({
        message: "Error interno en el servicio de productos",
        error: error.message
      });
    }
  }
});


router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://orders-service:6000/api/orders");

    res.status(response.status).json(response.data);

  } catch (error: any) {
    const backendError = error.response;
    if (backendError) {
      res.status(backendError.status).json(backendError.data);
    }
    else {
      res.status(500).json({
        message: "Error interno en el servicio de productos",
        error: error.message
      });
    }
  }
});

export default router;