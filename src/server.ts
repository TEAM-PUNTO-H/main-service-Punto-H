import app from "./app";
import { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import axios from "axios";


const PORT = process.env.PORT || 3000;

const waitForService = async (url: string, retries = 10, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Servicio disponible: ${url}`);
      return await axios.get(url);
    } catch {
      console.log(`Esperando servicio: ${url} (intento ${i + 1})`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error(`No se pudo conectar con ${url} tras ${retries} intentos`);
};

async function loadSwaggerDocs() {
  try {
    const usersDoc = await waitForService('http://users-service:4000/swagger.json');
    const productsDoc = await waitForService('http://product-management-service:5000/swagger.json');

    const combinedSwagger = {
      openapi: '3.0.0',
      info: {
        title: 'Centralized API Gateway Docs',
        version: '1.0.0',
      },
      paths: {
        ...usersDoc.data.paths,
        ...productsDoc.data.paths,
      },
      components: {
        ...usersDoc.data.components,
        ...productsDoc.data.components,
      },
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwagger));
  } catch (error) {
    console.error('Error cargando Swagger docs:', error);
  }
}


app.get("/api/main/users", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://users-service:4000/api/users");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: `Error conectando a users-service ${err}`} );
  }
});


app.get("/api/main/products", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://product-management-service:5000/api/products");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: `Error conectando a product-management-service ${err}`});
  }
});

app.post("/api/main/users", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://users-service:4000/api/users", req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: `Error creando usuario en users-service ${err}` });
  }
});

app.post("/api/main/products", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://product-management-service:5000/api/products", req.body);
    res.json(response.data);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Error creando compra en product-management-service ${err}` });
  }
});
loadSwaggerDocs();

app.listen(PORT, () => {
  console.log("Main service corriendo en http://localhost:3000");
});
