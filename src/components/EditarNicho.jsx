import { FiCheck, FiEdit, FiTrash2 } from "react-icons/fi";
import { useLoadProduct } from "../hooks/useLoadProducts";
import { useLoadCategories } from "../router/useLoadCategories";
import { FaTimes, FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { useLoadService } from "../hooks/useLoadServices";

export default function EditarNicho({
  updatedCategoria,
  handleUpdatedCategoria,
  setCategoriaLocal,
  setToggleUpdatedCategoria,
  setCambiosUpdatedGuardados,
  cambiosUpadtedGuardados,
}) {
  const { catalogoCategoria } = useLoadCategories();
  const productsIndividual = useLoadProduct();
  const servicesIndividual = useLoadService();
  const [menuOpciones, setMenuOpciones] = useState(false);
  const [editarNichoPadre, setEditarNichoPadre] = useState(false);
  const [productoEliminar, setProductoEliminar] = useState(null);
  const [eliminacionProducto, setEliminacionProducto] = useState(false);
  const [isUpdatingNombre, setIsUpdatingNombre] = useState(false);

  const isProductoNicho = updatedCategoria.tipo === "producto";

  const todoDentroNicho = isProductoNicho
    ? productsIndividual.productsIndividual.filter(
        (p) => p.categoria_ID === updatedCategoria.id
      )
    : servicesIndividual.servicesIndividual.filter(
        (p) => p.categoria_ID === updatedCategoria.id
      );
  // console.log(productoEliminar, "pro");
  // console.log(catalogoCategoria, "cate");
  // console.log(todoDentroNicho, "nicho");
  // console.log(updatedCategoria, "update");
  // console.log(productsIndividual, "individual");
  // console.log(servicesIndividual, "service");

  const handleEliminarIndividual = async () => {
    if (!productoEliminar) return;

    try {
      const isProducto = updatedCategoria.tipo === "producto";

      const url = isProducto
        ? "https://renova360-backend-production.up.railway.app/productos?action=eliminar_producto"
        : "https://renova360-backend-production.up.railway.app/servicios?action=eliminar_servicio";

      const body = isProducto
        ? { producto_ID: productoEliminar.producto_ID }
        : { servicio_ID: productoEliminar.servicio_ID };

      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.status === "success" || data.status === "ok") {
        setEliminacionProducto(true);
        setProductoEliminar(null);
        window.location.reload();
      }

      setTimeout(() => {
        setEliminacionProducto(false);
      }, 2000);
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  const handlePutCategoria = async (id, nombre, categorySlug, tipo) => {
    try {
      setIsUpdatingNombre(true);

      const res = await fetch(
        "https://renova360-backend-production.up.railway.app/nichos?action=editar_nicho",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, nombre, categorySlug, tipo }),
        }
      );

      const dataRes = await res.json();
      console.log("Respuesta del backend :", dataRes);

      setCategoriaLocal((prev) =>
        prev.map((item) =>
          item.categoria_ID === id
            ? { ...item, nombre, categorySlug, tipo }
            : item
        )
      );
      // setEliminacionProducto(false);
      setTimeout(() => {
        setToggleUpdatedCategoria(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(categoriaLocal, "categoriLocal");

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-center">
      {/* contenedor */}
      <div className="relative bg-[#0A0042] max-w-4xl w-[90%] h-[90vh] rounded-2xl shadow-2xl overflow-hidden pb-18">
        {/* header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white">
          <div className="flex w-full relative">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span onClick={() => setMenuOpciones(!menuOpciones)}>
                <HiDotsVertical className="text-2xl text-white cursor-pointer hover:text-gray-600 transition" />
              </span>
             <span className=""> {updatedCategoria.nombre} </span>
            </h2>

            {menuOpciones && (
              <div className="bg-white absolute top-7 left-4 rounded-md py-3 px-2 ">
                <a
                  onClick={() => setEditarNichoPadre(!editarNichoPadre)}
                  href="#"
                  style={{ color: "white" }}
                  className="bg-[#0A0042] px-5 py-2 rounded-md whitespace-nowrap "
                >
                  Editar Nicho padre
                </a>
              </div>
            )}
          </div>
          <button
            onClick={(e) => handleUpdatedCategoria(e)}
            style={{background: 'transparent'}}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaTimes className="text-xl text-white" />
          </button>
        </div>

        {editarNichoPadre && (
          <div className="absolute top-0 left-0 bg-[#000353]/70 backdrop-blur-sm w-full h-full flex justify-center items-center ">
            <div className="bg-[#000353] px-8 py-6 rounded-lg text-white w-[90%] max-w-md ">
              <div className="h-9 relative flex items-center mb-4 ">
                <button
                  onClick={() => setEditarNichoPadre(!editarNichoPadre)}
                  className="absolute right-[-5%] "
                >
                  X
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePutCategoria(
                    updatedCategoria.id,
                    cambiosUpadtedGuardados.nombre || updatedCategoria.nombre,
                    cambiosUpadtedGuardados.categorySlug ||
                      updatedCategoria.categorySlug,
                    cambiosUpadtedGuardados.tipo || updatedCategoria.tipo
                  );
                }}
                className="flex flex-col"
              >
                <input
                  type="text"
                  defaultValue={updatedCategoria.nombre}
                  onChange={(e) => {
                    const valor = e.target.value;

                    const slug = valor
                      .toLowerCase()
                      .trim()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "");

                    setCambiosUpdatedGuardados((prev) => ({
                      ...prev,
                      nombre: valor,
                      categorySlug: slug,
                    }));
                  }}
                  className="border border-white p-2 rounded-lg mb-4"
                />

                <input
                  type="text"
                  value={
                    cambiosUpadtedGuardados.categorySlug ||
                    updatedCategoria.categorySlug
                  }
                  readOnly
                  className="border border-white p-2 rounded-lg mb-4"
                />

                <select
                  defaultValue={updatedCategoria.tipo}
                  onChange={(e) =>
                    setCambiosUpdatedGuardados((prev) => ({
                      ...prev,
                      tipo: e.target.value,
                    }))
                  }
                  className="border border-white p-2 rounded-lg mb-4"
                >
                  <option value="producto" className="text-[#000353] ">
                    Producto
                  </option>
                  <option value="servicio" className="text-[#000353] ">
                    Servicio
                  </option>
                </select>

                <button
                  style={{
                    border: "1px solid #000353",
                    background: "white",
                    color: "#000353",
                  }}
                  type="submit"
                  className="mt-6 "
                >
                  Actualizar
                </button>
              </form>
            </div>
          </div>
        )}

        {/* contenido */}
        <div className="overflow-y-auto h-full px-6 py-6">
          {todoDentroNicho.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">
              No hay productos en este nicho
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {todoDentroNicho.map((t) => (
                <div
                  key={t.producto_ID || t.servicio_ID}
                  className="bg-[#000353] rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  {/* imagen */}
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={t.video_principal || t.imagenes?.[0]}
                      alt={t.nombre}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>

                  {/* informacion */}
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {t.nombre || t.nombre_empresa}
                    </h3>

                    <p className="text-sm text-white line-clamp-2">
                      {t.descripcion || t.descripcion_nombre}
                    </p>

                    <span className="text-lg font-bold text-white">
                      ${t.precio}
                    </span>

                    {/* botones cambios */}
                    <div className="flex gap-3 mt-3">
                      <button
                        style={{ background: "#C19400" }}
                        className="px-4 py-2 rounded-xl font-semibold shadow-md flex items-center gap-4 text-white"
                      >
                        <FiEdit />
                        Editar
                      </button>
                      <button
                        onClick={() => setProductoEliminar(t)}
                        style={{ background: "red" }}
                        className="px-4 py-2 rounded-xl font-semibold shadow-md flex items-center gap-4 text-white"
                      >
                        <FiTrash2 />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {productoEliminar && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center">
                  <div className="w-[90%] max-w-md bg-[#000353] rounded-lg px-8 py-7 flex flex-col items-center  ">
                    <h2 className="text-white ">
                      ¿ Seguro que quieres eliminar{" "}
                      {productoEliminar.nombre ||
                        productoEliminar.nombre_empresa}{" "}
                      ?
                    </h2>
                    <div className="mt-5 flex w-full gap-5 ">
                      <button
                        onClick={() => setProductoEliminar(null)}
                        style={{
                          background: "white",
                          color: "black",
                          border: "black",
                        }}
                        className="w-full "
                      >
                        No
                      </button>
                      <button
                        onClick={() => handleEliminarIndividual()}
                        style={{ background: "red", color: "white" }}
                        className="w-full "
                      >
                        Si
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {eliminacionProducto && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg px-8 py-6 flex flex-col items-center gap-4 shadow-lg">
                <FaCheckCircle className="text-green-600 text-5xl" />

                <p className="text-sm font-medium text-gray-700 text-center">
                  Eliminado con exito ...
                  <p>Se actualizara la pagina para ver los cambios.</p>
                </p>
              </div>
            </div>
          )}
          {isUpdatingNombre && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-lg px-6 py-4 flex items-center gap-3">
                <span className="animate-spin h-5 w-5 border-2 border-[#000353] border-t-transparent rounded-full"></span>
                <p className="text-[#000353] font-semibold">
                  Actualizando nombre, un momento...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
