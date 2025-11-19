import swaggerUi from "swagger-ui-express";
import axios from 'axios';
import app from '../app';

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

export async function loadSwaggerDocs() {
  try {
    const usersDoc = await waitForService('http://users-service:4000/swagger.json');
    const productsDoc = await waitForService('http://product-management-service:5000/swagger.json');
    const ordersDoc = await waitForService('http://orders-service:6000/swagger.json');

    const combinedSwagger = {
      openapi: '3.0.0',
      info: {
        title: 'Centralized API Gateway Docs',
        version: '1.0.0',
      },
      paths: {
        ...usersDoc.data.paths,
        ...productsDoc.data.paths,
        ...ordersDoc.data.paths,
      },
      components: {
        ...usersDoc.data.components,
        ...productsDoc.data.components,
        ...ordersDoc.data.components,
      },
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwagger));
  } catch (error) {
    console.error('Error cargando Swagger docs:', error);
  }
}