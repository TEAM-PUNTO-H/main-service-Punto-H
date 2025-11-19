import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

router.get("/allUsers", async (req: Request, res: Response) => {
    try {
        const response = await axios.get("http://users-service:4000/api/users/allUsers", {
            headers: { Cookie: req.headers.cookie },
            withCredentials: true
        });
        res.status(response.status).json(response.data);

    } catch (error: any) {
        const backendError = error.response;
        if (backendError) {
            res.status(backendError.status).json(backendError.data);
        }
        else {
            res.status(500).json({
                message: "Error interno en el servicio de usuarios",
                error: error.message
            });
        }
    }

});

router.post("/registerUser", async (req: Request, res: Response) => {

    try {
        const response = await axios.post("http://users-service:4000/api/users/registerUser", req.body);
        res.status(response.status).json(response.data);
    } catch (error: any) {
        const backendError = error.response;
        if (backendError) {
            res.status(backendError.status).json(backendError.data);
        }
        else {
            res.status(500).json({
                message: "Error interno en el servicio de usuarios",
                error: error.message
            });
        }
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const response = await axios.post("http://users-service:4000/api/users/login", req.body, {
            withCredentials: true
        });
        const setCookie = response.headers['set-cookie'];
        if (setCookie) {
            res.setHeader('Set-Cookie', setCookie);
        }
        res.status(response.status).json(response.data);

    } catch (error: any) {
        const backendError = error.response;
        if (backendError) {
            res.status(backendError.status).json(backendError.data);
        }
        else {
            res.status(500).json({
                message: "Error interno en el servicio de usuarios",
                error: error.message
            });
        }
    }

});

export default router;