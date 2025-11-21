import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

router.get("/allProducts", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://product-management-service:5000/api/products/allProducts");
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


router.post("/createProduct", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://product-management-service:5000/api/products/createProduct", req.body);
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

router.get("/productById/:id", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`http://product-management-service:5000/api/products/productById/${req.params.id}`);
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

router.get("/productByName", async (req: Request, res: Response) => {

  try {
    const response = await axios.get(`http://product-management-service:5000/api/products/productByName`,
      { params: { name: req.query.name } });

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

router.put("/updateProduct/:id", async (req: Request, res: Response) => {
  try {
    const response = await axios.put(`http://product-management-service:5000/api/products/updateProduct/${req.params.id}`, req.body);
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

router.delete("/deleteProduct/:id", async (req: Request, res: Response) => {
  try {
    const response = await axios.delete(`http://product-management-service:5000/api/products/deleteProduct/${req.params.id}`);
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