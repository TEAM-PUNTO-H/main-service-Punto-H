import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

router.get("/allRestaurants", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://product-management-service:5000/api/restaurant/allRestaurants");
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


router.post("/create", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://product-management-service:5000/api/restaurant/create", req.body);
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

router.get("/restaurantById/:id", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`http://product-management-service:5000/api/restaurant/restaurantById/${req.params.id}`);
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


router.put("/updateRestaurant/:id", async (req: Request, res: Response) => {
  try {
    const response = await axios.put(`http://product-management-service:5000/api/restaurant/updateRestaurant/${req.params.id}`, req.body);
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

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const response = await axios.delete(`http://product-management-service:5000/api/restaurant/delete/${req.params.id}`);
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