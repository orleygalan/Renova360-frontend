import { useParams } from "react-router-dom";
import { useLoadCategories } from "../router/useLoadCategories";
import { BiArrowToRight } from "react-icons/bi";
import Footer from "../components/footer";
import React, { useState } from "react";
import { useLoadService } from "../hooks/useLoadServices";
import PopUpService from "../components/PopUpService";
import { FiBox, FiTool } from "react-icons/fi";

export default function ServiceCategoryPage() {
  const { slug } = useParams();
  const { serviceCategories } = useLoadCategories();
  const { servicioRenova, productService } = useLoadService();
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  // Buscar categoria segun slug
  const category = serviceCategories.find((c) => c.slug === slug);
  console.log(category, "1");
  console.log(productService, "producto Service");

  console.log(servicioSeleccionado, "2");

  React.useEffect(() => {
    if (servicioSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [servicioSeleccionado]);

  if (!category) {
    return <p>No existe esta categoría.</p>;
  }

  // filtrrar servicios por categoria_ID
  const filteredService = servicioRenova
    ? servicioRenova.filter(
        (prod) => prod.categoria_ID === category.categoria_ID
      )
    : [];
  console.log(filteredService);

  return (
    <div className="bg-[white] w-full min-h-[100dvh] grid grid-rows-[1fr_auto]">
      {filteredService.length === 0 && (
        <div className="flex items-center justify-center h-screen ">
          <div className="flex flex-col items-center text-center bg-[#D9D9D9] backdrop-blur-md px-8 py-10 rounded-2xl border border-white/10 shadow-xl">
            <FiTool className="text-5xl text-black mb-4" />

            <h3 className="text-xl font-semibold text-black mb-1">
              Sin servicios disponibles
            </h3>

            <p className="text-sm text-black">
              Aún no se han agregado servicios a este nicho
            </p>
          </div>
        </div>
      )}

      <main className="flex justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-[8vh] md:pt-[10vh] ">
            {filteredService.map((p) => (
              <div
                key={p.servicio_ID}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={p.video_principal}
                    alt={p.categoria_nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {p.nombre_empresa}
                </h2>

                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {p.descripcion_nombre}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-blue-600">${p.precio}</p>
                  <button
                    onClick={() => setServicioSeleccionado(p)}
                    style={{ background: "blue" }}
                    className="text-[#ffffff] "
                  >
                    {" "}
                    <BiArrowToRight />{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {servicioSeleccionado ? (
          <div className="fixed top-0 left-0 h-screen z-3 bg-white ">
            {/* <div className="">
              <img src={servicioSeleccionado.video_principal} alt="" />
              <button> Llamar para agendar una cita </button>
              <div>
                <h3>Quieres un excelente servicio</h3>
              </div>
            </div> */}
            <div>
              <PopUpService
                servicioSeleccionado={servicioSeleccionado}
                setServicioSeleccionado={setServicioSeleccionado}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </div>
  );
}
