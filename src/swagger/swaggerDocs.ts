import swaggerUi from "swagger-ui-express";
import axios from "axios";
import app from "../app";

const waitForService = async (url: string, retries = 5, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Servicio disponible: ${url}`);
      return await axios.get(url);
    } catch {
      console.log(`Esperando servicio: ${url} (intento ${i + 1})`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  console.log(`No se pudo conectar con ${url} tras ${retries} intentos`);
  return null; 
};

export async function loadSwaggerDocs() {
  const services = [
    { name: "users", url: "http://users-service:4000/swagger.json" },
    { name: "products", url: "http://product-management-service:5000/swagger.json" },
    { name: "orders", url: "http://orders-service:6000/swagger.json" }
  ];

  const combinedSwagger: any = {
    openapi: "3.0.0",
    info: {
      title: "Centralized API Gateway Docs",
      version: "1.0.0",
    },
    paths: {},
    components: {},
  };

  for (const srv of services) {
    console.log(`\nCargando swagger de: ${srv.name}`);

    const response = await waitForService(srv.url);

    if (response?.data) {
      console.log(`Swagger cargado: ${srv.name}`);
      try {
        combinedSwagger.paths = { ...combinedSwagger.paths, ...response.data.paths };

        if (response.data.components) {
          combinedSwagger.components = {
            ...combinedSwagger.components,
            ...response.data.components,
          };
        }
      } catch (err) {
        console.error(`Error procesando swagger de ${srv.name}:`, err);
      }

    } else {
      console.log(`Swagger no disponible para: ${srv.name}, agregando ruta de error`);

      combinedSwagger.paths[`/__error__/${srv.name}`] = {
        get: {
          summary: `No se pudo cargar la documentación de ${srv.name}`,
          description: `El microservicio '${srv.name}' no respondió o está fuera de servicio.`,
          responses: {
            "503": {
              description: "Microservicio no disponible",
            },
          },
        },
      };
    }
  }

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(combinedSwagger));

  console.log("\n Documentación Swagger centralizada lista en /api-docs\n");
}
