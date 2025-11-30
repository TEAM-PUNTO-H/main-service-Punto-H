import { Request,Response,Router } from "express";
import axios from "axios";

const router = Router();

router.get("/allReviews", async (req: Request, res: Response) => {
    try {
        const response = await axios.get("http://product-management-service:5000/api/reviews/allReviews");
        res.status(response.status).json(response.data);
    } catch (error: any) {
        const backendError = error.response;
        if (backendError) {
            res.status(backendError.status).json(backendError.data);
        }
        else {
            res.status(500).json({
                message: "Error interno en el servicio de reseñas",
                error: error.message
            });
        }
    }
});

router.get("/reviewById/:id", async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`http://product-management-service:5000/api/reviews/reviewById/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error: any) {
        const backendError = error.response;
        if (backendError) {
            res.status(backendError.status).json(backendError.data);
        }
        else {
            res.status(500).json({
                message: "Error interno en el servicio de reseñas",
                error: error.message
            });
        }
    }
});

router.post("/createReview", async (req: Request, res: Response) => {
    try {
        const response = await axios.post("http://product-management-service:5000/api/reviews/createReview",req.body);
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

router.put("/updateReview/:id", async (req: Request, res: Response) => {
    try {
        const response = await axios.put(`http://product-management-service:5000/api/reviews/updateReview/${req.params.id}`, req.body);
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

router.delete("/deleteReview/:id", async (req: Request, res: Response) => {
    try {
        const response = await axios.delete(`http://product-management-service:5000/api/reviews/deleteReview/${req.params.id}`);
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