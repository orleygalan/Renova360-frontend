import { useEffect, useState } from "react";
import { useLoadCategories } from "../router/useLoadCategories";

export function useLoadProduct() {
    const [productsIndividual, setProductsIndividual] = useState([]);
    const [servicesIndividual, setServicesIndividual] = useState([]);
    const [productService, setProductService] = useState([]);

    const { productCategories, serviceCategories } = useLoadCategories();

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(
                    "https://renova360-backend-production.up.railway.app/productos?action=obtener_productos"
                );
                const data = await res.json();


                if (!data) {
                    throw new Error('Formato invalido')
                }

                const all = data.data;

                const productsOnly = all.filter((p) =>
                    productCategories.some((cat) => cat.categoria_ID === p.categoria_ID)
                );

                const servicesOnly = all.filter((p) =>
                    serviceCategories.some((cat) => cat.categoria_ID === p.categoria_ID)
                );

                setProductsIndividual(productsOnly);
                setServicesIndividual(servicesOnly);
                setProductService(all);
            } catch (error) {
                console.log('Error al cargar productos :', error);

            }
        }
        load();
    }, [productCategories, serviceCategories])
    return { productsIndividual, servicesIndividual, productService }
}