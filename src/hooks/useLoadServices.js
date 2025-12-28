import { useEffect, useState } from "react";
import { useLoadCategories } from "../router/useLoadCategories";

export function useLoadService() {
  const [servicioRenova, setServicioRenova] = useState([]);
  const [servicesIndividual, setServicesIndividual] = useState([]);
  const [productService, setProductService] = useState([]);

  const { serviceCategories } = useLoadCategories();

  useEffect(() => {
    async function load() {
      try {
        if (!serviceCategories.length) return;

        const res = await fetch(
          "https://renova360-backend-production.up.railway.app/servicios?action=obtener_servicios"
        );

        const json = await res.json();
        console.log(json, "respuesta backend servicios");

        if (json.status !== "ok" || !Array.isArray(json.servicios)) {
          throw new Error("Formato inválido");
        }

        const all = json.servicios;

        const servicesOnly = all.filter((p) =>
          serviceCategories.some(
            (cat) => cat.categoria_ID === p.categoria_ID
          )
        );

        setServicioRenova(servicesOnly);
        setServicesIndividual(servicesOnly);
        setProductService(all);

      } catch (error) {
        console.log("Error al cargar servicios:", error);
      }
    }

    load();
  }, [serviceCategories]);

  return { servicioRenova, servicesIndividual, productService };
}
