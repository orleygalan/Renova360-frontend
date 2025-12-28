import { useEffect, useState } from "react";

export function useLoadCategories() {
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [catalogoCategoria, setCatalogoCategoria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://renova360-backend-production.up.railway.app/nichos?action=obtener_nichos"
        );

        const json = await res.json();
        console.log(json, "respuesta backend");

        if (json.status !== "ok" || !Array.isArray(json.categorias)) {
          throw new Error("Formato inválido");
        }
        const categorias = json.categorias;

        const products = categorias
          .filter((c) => c.tipo === "producto")
          .map((c) => ({
            categoria_ID: c.categoria_ID,
            slug: c.categorySlug,
            name: c.nombre,
          }));

        const services = categorias
          .filter((c) => c.tipo === "servicio")
          .map((c) => ({
            categoria_ID: c.categoria_ID,
            slug: c.categorySlug,
            name: c.nombre,
          }));

        setProductCategories(products);
        setServiceCategories(services);
        setCatalogoCategoria(categorias);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    productCategories,
    serviceCategories,
    catalogoCategoria,
    loading,
    error,
  };
}
