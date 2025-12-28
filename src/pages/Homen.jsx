import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { useLoadCategories } from "../router/useLoadCategories";

export default function Homen() {
  const { catalogoCategoria } = useLoadCategories();

  console.log(catalogoCategoria, "respuest");

  const navigate = useNavigate();

  return (
    <>
      <main className="w-full min-h-screen pt-[9%] sm:pt-[1vh] from-white to-blue-50">
        <div className="w-full relative h-[60vh] sm:h-[90vh] flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            alt="Hero"
            className="w-full h-full object-cover rounded-b-3xl shadow-md"
          />

          <div className="absolute inset-0 bg-black/40 rounded-b-3xl"></div>

          <div className="absolute text-center text-white max-w-2xl px-6">
            <h1 className="text-4xl font-bold drop-shadow-lg">
              Bienvenido a Renova360
            </h1>
            <p className="mt-3 text-lg opacity-90">
              Calidad, diseño y servicio profesional en un solo lugar.
            </p>
          </div>
        </div>

        <section className="max-w-6xl mx-auto mt-16 px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Nuestros Productos y Servicios
            </h2>
            <p className="text-gray-600 mt-2">
              Descubre nuestra selección de productos y servicios profesionales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogoCategoria.map((ps) => (
              <div
                key={ps.categoria_ID}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 overflow-hidden hover:-translate-y-1"
              >
                <img
                  src={ps.imagen}
                  alt={ps.nombre}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {ps.nombre}
                  </h2>
                  <p className="text-gray-600 mt-2 line-clamp-3 text-sm">
                    {ps.descripcion}
                  </p>

                  <button
                    onClick={() => navigate(`${ps.tipo}/${ps.categorySlug}`)}
                    style={{ background: "blue" }}
                    className="mt-4 w-full hover:bg-blue-700 text-white py-2 rounded-xl transition"
                  >
                    Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
