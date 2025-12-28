import { useParams } from "react-router-dom";
import { useLoadProduct } from "../hooks/useLoadProducts";
import { useLoadCategories } from "../router/useLoadCategories";
import { BiArrowToRight } from "react-icons/bi";
import Footer from "../components/footer";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import CarruselPublicidad from "../components/CarruselPublicidad";
import Reviews from "../components/Reviews";
import { FiBox } from "react-icons/fi";

export default function ProductCategoryPage() {
  const { slug } = useParams();
  const productsIndividual = useLoadProduct();
  const { productCategories } = useLoadCategories();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [leerMasDescripcion, setLeerMasDescripcion] = useState(false);

  const [galeriaAbierta, setGaleriaAbierta] = useState(false);
  const [fotoActual, setFotoActual] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  console.log(productoSeleccionado, "producto seleccionado");
  // productsIndividual, servicesIndividual, productService
  console.log(productsIndividual, "respuesta");
  React.useEffect(() => {
    if (productoSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [productoSeleccionado]);

  // Buscar categoría según slug
  const category = productCategories.find((c) => c.slug === slug);

  if (!category) {
    return <p>No existe esta categoría.</p>;
  }

  // Filtrar productos por categoria_ID
  const filteredProducts = productsIndividual.productsIndividual
    ? productsIndividual.productsIndividual.filter(
        (prod) => prod.categoria_ID === category.categoria_ID
      )
    : [];

  // console.log(productoSeleccionado, "produco seleccionado");

  const abrirGaleria = (index) => {
    setFotoActual(index);
    setGaleriaAbierta(true);
  };

  const siguienteFoto = () => {
    setFotoActual((prev) =>
      prev === productoSeleccionado.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const anteriorFoto = () => {
    setFotoActual((prev) =>
      prev === 0 ? productoSeleccionado.imagenes.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-[white] h-screen ">
      {filteredProducts.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center text-center bg-[#D9D9D9] backdrop-blur-md px-8 py-10 rounded-2xl border border-white/10 shadow-xl">
            <FiBox className="text-5xl text-black mb-4" />

            <h3 className="text-xl font-semibold text-black mb-1">
              Sin productos disponibles
            </h3>

            <p className="text-sm text-black">
              Aún no se han agregado productos a este nicho
            </p>
          </div>
        </div>
      )}

      <main className="contenedorProducto bg-[white] pt-[20vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 py-10 h-screen ">
        {filteredProducts.map((p) => (
          <div
            key={p.producto_ID}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 duration-300 overflow-hidden border border-gray-100 h-full"
          >
            <div className="h-56 w-full overflow-hidden">
              <img
                src={p.imagenes[0]}
                alt={p.nombre}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {p.nombre}
              </h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2 ">
                {p.descripcion}
              </p>

              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-blue-600">${p.precio}</p>
                <button
                  onClick={() => setProductoSeleccionado(p)}
                  style={{ background: "blue" }}
                  className="text-[#ffffff] "
                >
                  <BiArrowToRight />
                </button>
              </div>
            </div>
          </div>
        ))}
        {productoSeleccionado ? (
          <div className="fixed top-0 left-0 w-full h-full bg-white z-3">
            <div className="overflow-y-auto w-full h-screen ">
              <div className="fixed w-full h-[9vh] z-2 top-0 left-0 bg-white/80 backdrop-blur-sm shadow-2xs ">
                <button
                  style={{ background: "transparent" }}
                  onClick={() => setProductoSeleccionado(null)}
                  className="fixed flex gap-4 items-center z-1 font-bold mb-4"
                >
                  <IoClose className="text-3xl " />

                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    {productoSeleccionado.nombre}
                  </h2>
                </button>
              </div>
              <div className="px-5 pt-[14vh] ">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="relative">
                    <div className="hidden md:grid grid-cols-2 gap-3">
                      {productoSeleccionado.imagenes
                        .slice(0, 4)
                        .map((img, index) => {
                          const imagenes = productoSeleccionado.imagenes;
                          const restantes = imagenes.length - 4;

                          return (
                            <div
                              key={index}
                              className="relative cursor-pointer"
                              onClick={() => abrirGaleria(index)}
                            >
                              <img
                                src={img}
                                className="w-full h-48 object-cover rounded-xl shadow-md"
                              />

                              {index === 3 && restantes > 0 && (
                                <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                                  <span className="text-white text-3xl font-bold">
                                    +{restantes}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>

                    {galeriaAbierta && (
                      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
                        {/* Botón cerrar */}
                        <button
                          style={{ background: "transparent" }}
                          className="absolute top-5 right-5 text-white text-5xl"
                          onClick={() => setGaleriaAbierta(false)}
                        >
                          ✕
                        </button>

                        {/* Imagen actual */}
                        <div className="relative w-[90%] md:w-[60%]">
                          <img
                            src={productoSeleccionado.imagenes[fotoActual]}
                            className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                          />

                          {/* Botón ANTERIOR */}
                          <button
                            style={{ background: "#3a3939" }}
                            onClick={anteriorFoto}
                            className="absolute top-1/2 -left-5 -translate-y-1/2 text-white text-4xl bg-white/20 hover:bg-white/30 rounded-full w-12 h-12 flex items-center justify-center"
                          >
                            ‹
                          </button>

                          {/* Botón SIGUIENTE */}
                          <button
                            style={{ background: "#3a3939" }}
                            onClick={siguienteFoto}
                            className="absolute top-1/2 -right-5 -translate-y-1/2 text-white text-4xl bg-white/20 hover:bg-white/30 rounded-full w-12 h-12 flex items-center justify-center"
                          >
                            ›
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="md:hidden relative">
                      <div
                        id="carrusel"
                        style={{ scrollbarWidth: "none" }}
                        className="flex overflow-x-auto snap-x snap-mandatory space-x-4 scroll-smooth"
                      >
                        {productoSeleccionado.imagenes.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            onClick={() => abrirGaleria(index)}
                            className="w-[85%] h-64 object-cover rounded-xl shadow-xl snap-center transition-all duration-300"
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          const cont = document.getElementById("carrusel");
                          cont.scrollLeft -= cont.clientWidth;
                        }}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-lg w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold"
                      >
                        ‹
                      </button>

                      <button
                        onClick={() => {
                          const cont = document.getElementById("carrusel");
                          cont.scrollLeft += cont.clientWidth;
                        }}
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-lg w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-2">Color :</h3>
                      <div className="flex gap-3">
                        {productoSeleccionado.colores.map((c, index) => (
                          <button
                            key={index}
                            style={{
                              background: "#D1D5DB",
                              padding: "5px 10px 5px 10px",
                            }}
                            className="rounded-lg transition"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <h3 className="font-bold mb-2">Dimensiones :</h3>
                      <p className="text-black">
                        {productoSeleccionado.dimensiones.largo}
                        <span className="font-semibold">x </span>
                        {productoSeleccionado.dimensiones.ancho}
                        <span className="font-semibold">x </span>
                        {productoSeleccionado.dimensiones.alto}
                      </p>
                    </div>

                    <div className="flex gap-5">
                      <h3 className="font-bold mb-2"> Precio :</h3>
                      <p>${productoSeleccionado.precio} </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold mb-2">Stock disponible</h3>
                        {/* Botón menos */}
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setCantidad((prev) => (prev > 1 ? prev - 1 : 1))
                            }
                            style={{ background: "blue", padding: "0" }}
                            className="w-5 h-5 text-white rounded-full flex items-center justify-center text-xl"
                          >
                            -
                          </button>
                          <span>{cantidad}</span>
                          {/* Botón más */}
                          <button
                            onClick={() =>
                              setCantidad((prev) =>
                                prev < productoSeleccionado.stock
                                  ? prev + 1
                                  : prev
                              )
                            }
                            style={{ background: "blue", padding: "0" }}
                            className="w-5 h-5 text-white rounded-lg flex items-center justify-center text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full bg-gray-300 rounded-xl px-5 py-3">
                        {/* Texto cantidad */}
                        <span className="font-medium text-gray-900">
                          Cantidad: {cantidad} ({productoSeleccionado.stock}
                          unidades)
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-2">Descripción :</h3>

                      <p
                        className={
                          leerMasDescripcion
                            ? "text-gray-700 leading-relaxed"
                            : "text-gray-700 leading-relaxed line-clamp-3"
                        }
                      >
                        {productoSeleccionado.descripcion}
                      </p>

                      <span
                        onClick={() =>
                          setLeerMasDescripcion(!leerMasDescripcion)
                        }
                        className="text-blue-600 cursor-pointer font-medium"
                      >
                        {leerMasDescripcion ? "Leer menos" : "Leer más..."}
                      </span>
                    </div>

                    <div className="flex gap-4 mt-6 whitespace-nowrap">
                      <button
                        style={{ background: "blue" }}
                        className="text-white px-6 py-3 rounded-lg shadow"
                      >
                        Comprar
                      </button>
                      <button
                        style={{ background: "white", borderColor: "blue" }}
                        className="px-6 py-3 text-[blue] rounded-lg"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-6xl mx-auto px-5">
                <h2 className="text-xl font-semibold mb-4">
                  Cosas que te podrian interesar
                </h2>
              </div>
              {/* <div className="p-7">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">
                  Lo mejor y lo versatil en un solo lugar
                </h2>

                <CarruselPublicidad />
              </div> */}

              {/* <div className="mt-10 p-7">
                <h3 className="text-2xl font-bold mb-5 text-gray-800">
                  Opiniones del producto
                </h3>

                <div className="space-y-6">
                  {productoSeleccionado.comentarios.map((c, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-md p-5 flex gap-4 items-start border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="min-w-[60px] min-h-[60px]">
                        <img
                          src={c.img || "https://i.pravatar.cc/150?u=" + index}
                          className="w-14 h-14 rounded-full object-cover shadow-md"
                          alt="avatar"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex text-yellow-400 text-lg">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>

                        <h4 className="font-semibold text-gray-900">
                          {c.usuario}
                        </h4>

                        <p className="text-gray-600 leading-relaxed">
                          {c.comentario}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
              <Reviews productoSeleccionado={productoSeleccionado} />
              <Footer />
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
