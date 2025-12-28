import {
  FiArchive,
  FiEdit,
  FiList,
  FiMail,
  FiPackage,
  FiPlusCircle,
  FiSettings,
  FiShoppingBag,
  FiTrash2,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { useLoadCategories } from "../router/useLoadCategories";
import React, { useEffect, useState } from "react";
import AgregarNuevoNicho from "../components/AgregarNuevoNicho";
import ControlInventario from "../components/ControlInventario";
import AgregarProductoServicio from "../components/AgregarProductoServicio";
import AgregarNuevoAdmin from "../components/AgregarNuevoAdmin";
import EditarNicho from "../components/EditarNicho";

export default function AdminPanel() {
  const { catalogoCategoria } = useLoadCategories();
  console.log(catalogoCategoria, "catalogoCategoria");

  const [toggleAgregarNicho, setToggleAgregarNicho] = useState(false);
  // const [toggleInventario, setToggleInventario] = useState(false);
  const [toggleAgregarProductService, setToggleAgregarProductService] =
    useState(false);
  const [toggleAgregarAdmin, setToggleAgregarAdmin] = useState(false);
  const [categoriaLocal, setCategoriaLocal] = useState([]);
  const [toggleUpdatedCategoria, setToggleUpdatedCategoria] = useState(false);
  const [updatedCategoria, setUpdatedCategoria] = useState({
    id: "",
    nombre: "",
    categorySlug: "",
    tipo: "",
  });
  const [cambiosUpadtedGuardados, setCambiosUpdatedGuardados] = useState({
    nombre: "",
    categorySlug: "",
    tipo: "",
  });
  const [verificarEliminarCategoria, setVerificarEliminarCategoria] =
    useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  React.useEffect(() => {
    if (toggleUpdatedCategoria) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleUpdatedCategoria]);

  console.log(updatedCategoria);

  const handleAgregarNicho = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleAgregarNicho(!toggleAgregarNicho);
  };
  // const handleInventario = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   setToggleInventario(!toggleInventario);
  // };
  const handleProductService = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleAgregarProductService(!toggleAgregarProductService);
  };
  const handleAddAdmin = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleAgregarAdmin(!toggleAgregarAdmin);
  };
  const handleUpdatedCategoria = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleUpdatedCategoria(!toggleUpdatedCategoria);
  };
  // console.log(catalogoCategoriaID);

  const handleDeleteCategoria = async (catalogoCategoriaID) => {
    try {
      const res = await fetch(
        "https://renova360-backend-production.up.railway.app/nichos?action=eliminar_nicho",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: catalogoCategoriaID }),
        }
      );

      const data = await res.json();
      console.log("Respuesta del backend:", data);

      setCategoriaLocal((prev) =>
        prev.filter((item) => item.categoria_ID !== catalogoCategoriaID)
      );
    } catch (error) {
      console.error("Error eliminando nicho:", error);
    }
  };

  useEffect(() => {
    setCategoriaLocal(catalogoCategoria);
  }, [catalogoCategoria]);

  return (
    <>
      <div className="w-full min-h-screen bg-[#0A0042] flex flex-col items-center py-30 overflow-x-hidden">
        <div className="w-[90%] max-w-5xl text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide flex items-center gap-4">
            <FiPackage />
            Gestión de Productos
          </h2>
          <hr className="border-[#FFFFF] mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categoriaLocal.map((ca) => (
              <div
                key={ca.categoria_ID}
                className="bg-[#120060] p-6 rounded-2xl shadow-xl border border-[#000353]  transition-all duration-300"
              >
                <h4 className="text-xl font-semibold mb-2">
                  Nicho {ca.categoria_ID}:
                  <span className="text-[#FFFFF]">{ca.nombre}</span>
                </h4>

                <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                  <img
                    src={ca.imagen}
                    alt={ca.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <hr className="border-[#3b2fa1] mb-4" />

                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      handleUpdatedCategoria(e);
                      setUpdatedCategoria({
                        id: ca.categoria_ID,
                        nombre: ca.nombre,
                        categorySlug: ca.categorySlug,
                        tipo: ca.tipo,
                      });
                    }}
                    style={{ background: "#C19400" }}
                    className="px-4 py-2 rounded-xl font-semibold shadow-md flex items-center gap-4"
                  >
                    <FiEdit />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setCategoriaAEliminar(ca.categoria_ID);
                      setVerificarEliminarCategoria(true);
                    }}
                    style={{ background: "red" }}
                    className="px-4 py-2 rounded-xl font-semibold shadow-md flex items-center gap-4"
                  >
                    <FiTrash2 />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {verificarEliminarCategoria ? (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-sm flex justify-center items-center z-3 ">
            <div className="w-[90%] max-w-md bg-[#000353] rounded-lg px-8 py-7 flex flex-col items-center  ">
              <h2 className="text-white ">
                ¿ Seguro que quieres eliminar este nicho ?
              </h2>
              <div className="mt-5 flex w-full gap-5 ">
                <button
                  onClick={() => setVerificarEliminarCategoria(false)}
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
                  onClick={() => {
                    handleDeleteCategoria(categoriaAEliminar);
                    setVerificarEliminarCategoria(false);
                  }}
                  style={{ background: "red", color: "white" }}
                  className="w-full "
                >
                  Si
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {toggleUpdatedCategoria ? (
          <EditarNicho
            categoriaLocal={categoriaLocal}
            updatedCategoria={updatedCategoria}
            handleUpdatedCategoria={(e) => handleUpdatedCategoria(e)}
            setCategoriaLocal={setCategoriaLocal}
            setToggleUpdatedCategoria={setToggleUpdatedCategoria}
            setCambiosUpdatedGuardados={setCambiosUpdatedGuardados}
            cambiosUpadtedGuardados={cambiosUpadtedGuardados}
          />
        ) : (
          ""
        )}

        <div className="mt-16 text-white flex flex-col items-center">
          <div className="w-[87vw] ">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-4">
              <FiSettings /> Opciones del Panel
            </h2>
            <hr className="border-[#FFFF] mb-10 " />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              type="button"
              style={{ background: "#000353" }}
              className="p-6 rounded-2xl shadow-lg"
              onClick={(e) => handleAgregarNicho(e)}
            >
              <span className="text-xl font-semibold text-[#ffffff] mb-2 flex items-center gap-4">
                <FiPlusCircle /> Agregar nuevo nicho
              </span>
              <p className="opacity-70 text-sm">
                Crea una nueva categoría para tu catálogo.
              </p>
            </button>

            <AgregarNuevoNicho
              setToggleAgregarNicho={setToggleAgregarNicho}
              toggleAgregarNicho={toggleAgregarNicho}
              handleAgregarNicho={(e) => handleAgregarNicho(e)}
            />

            {/* <button
              type="button"
              style={{ background: "#000353" }}
              className="p-6 rounded-2xl shadow-lg"
              onClick={(e) => handleInventario(e)}
            >
              <span className=" text-xl font-semibold text-[#ffffff] mb-2 flex items-center gap-4">
                <FiArchive /> Control de Inventario
              </span>
              <p className="opacity-70 text-sm">
                Gestiona cantidades, stock y disponibilidad.
              </p>
            </button> */}

            {/* <ControlInventario
              handleInventario={(e) => handleInventario(e)}
              toggleInventario={toggleInventario}
            /> */}

            <button
              type="button"
              style={{ background: "#000353" }}
              onClick={(e) => handleProductService(e)}
              className="p-6 rounded-2xl shadow-lg"
            >
              <span className="text-xl font-semibold text-[#ffffff] mb-2 flex items-center gap-4 ">
                <FiShoppingBag /> Agregar producto/servicio
              </span>
              <p className="opacity-70 text-sm">
                Añade nuevos artículos al catálogo general.
              </p>
            </button>

            <AgregarProductoServicio
              handleProductService={(e) => handleProductService(e)}
              setToggleAgregarProductService={setToggleAgregarProductService}
              toggleAgregarProductService={toggleAgregarProductService}
            />

            {/* <div className="bg-[#000353] p-6 rounded-2xl border border-[#000353] shadow-lg">
              <h2 className="text-xl font-semibold text-[#ffffff] mb-4 flex items-center gap-4">
                <FiUsers /> Gestión de usuarios
              </h2>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  style={{ background: "#080364" }}
                  className="text-white py-2 px-4 rounded-xl font-semibold shadow-md flex items-center gap-4"
                >
                  <FiList />
                  Historial de compras
                </button>

                <button
                  style={{ background: "#080364" }}
                  className="text-white py-2 px-4 rounded-xl font-semibold shadow-md flex items-center gap-4"
                >
                  <FiMail />
                  Formularios enviados
                </button>
              </div>
            </div> */}

            <button
              type="button"
              onClick={(e) => handleAddAdmin(e)}
              style={{ background: "#000353" }}
              className="p-6 rounded-2xl shadow-lg"
            >
              <span className="text-xl font-semibold text-[#ffffff] mb-2 flex items-center gap-4">
                <FiUserPlus /> Agregar nuevo administrador
              </span>
              <p className="opacity-70 text-sm">
                Otorga acceso a nuevos miembros del equipo.
              </p>
            </button>
            <AgregarNuevoAdmin
              setToggleAgregarAdmin={setToggleAgregarAdmin}
              toggleAgregarAdmin={toggleAgregarAdmin}
              handleAddAdmin={(e) => handleAddAdmin(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
