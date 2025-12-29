import React, { useState } from "react";
import { useLoadCategories } from "../router/useLoadCategories";
import { FaCheckCircle } from "react-icons/fa";

export default function AgregarProductoServicio({
  handleProductService,
  setToggleAgregarProductService,
  toggleAgregarProductService,
}) {
  React.useEffect(() => {
    if (toggleAgregarProductService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleAgregarProductService]);

  const { productCategories, serviceCategories } = useLoadCategories();
  const [productoServicio, setProductoServicio] = useState("");
  const [categoria_ID, setCategoria_ID] = useState();
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [stockProducto, setStockProducto] = useState();
  const [coloresProducto, setColoresProducto] = useState([]);
  const [dimencionesProducto, setDimencionesProducto] = useState({
    alto: "",
    ancho: "",
    largo: "",
  });
  const [descripcionServicio, setDescripcionServicio] = useState("");
  const [statusEnviado, setStatusEnviado] = useState(false);
  const [imagenProducto, setImagenProducto] = useState([]);
  const [imagenService, setImagenService] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombreService, setNombreService] = useState("");

  console.log(categoria_ID);
  console.log(descripcionServicio);

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formDataProducto = new FormData();

    const data = {
      nombre: nombreProducto,
      descripcion: descripcionProducto,
      precio: precioProducto,
      stock: stockProducto,
      categoria_ID: categoria_ID,
      colores: coloresProducto,
      dimensiones: dimencionesProducto,
    };

    formDataProducto.append("data", JSON.stringify(data));

    imagenProducto.forEach((file) => {
      formDataProducto.append("imagenes[]", file);
    });

    fetch(
      "https://renova360-backend-production.up.railway.app/productos?action=agregar_producto",
      {
        method: "POST",
        body: formDataProducto,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // setStatusEnvio(data.status);
        console.log("Respuesta del servidor:", data);

        if (data.status === "success") {
          setStatusEnviado(true);
          setNombreProducto("");
          setDescripcionProducto("");
          setImagenProducto([]);
          setPrecioProducto("");
          setStockProducto("");
          setCategoria_ID("");
          setColoresProducto([]);
          setDimencionesProducto({
            alto: "",
            ancho: "",
            largo: "",
          });
          setLoading(false);
        } else {
          setStatusEnviado(false);
        }

        setTimeout(() => {
          setToggleAgregarProductService(false);
          setStatusEnviado(false);
        }, 2000);
      })
      .catch((err) => console.error("Error:", err));
  };

  const isDiseabledProduct =
    !nombreProducto ||
    !descripcionProducto ||
    !precioProducto ||
    !stockProducto ||
    !categoria_ID ||
    !coloresProducto.length ||
    !dimencionesProducto.alto ||
    !dimencionesProducto.ancho ||
    !dimencionesProducto.largo;

  const handleServiceSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formDataService = new FormData();

    const data = {
      categoria_ID: categoria_ID,
      descripcion_nombre: descripcionServicio,
      nombre_empresa: nombreService,
    };

    formDataService.append("dataService", JSON.stringify(data));

    formDataService.append("imagen", imagenService);

    fetch(
      "https://renova360-backend-production.up.railway.app/servicios?action=agregar_servicio",
      {
        method: "POST",
        body: formDataService,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        if (data.status === "ok") {
          setStatusEnviado(true);
          setDescripcionServicio("");
          setImagenService("");
          setLoading(false);
        } else {
          setStatusEnviado(false);
        }

        setTimeout(() => {
          setToggleAgregarProductService(false);
          setStatusEnviado(false);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => console.error("Error:", err));
  };

  const isDiseabledService =
    !descripcionServicio || !nombreService || !imagenService;

  const btnActive = {
    backgroundColor: "#ffffff",
    color: "blue",
    border: "1px solid #ffffff",
    borderRadius: "12px",
    padding: "12px 24px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };
  const btnDisabled = {
    backgroundColor: "rgba(0, 3, 83, 0.4)",
    color: "rgba(255, 255, 255, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "12px 24px",
    fontWeight: "600",
    cursor: "not-allowed",
  };

  return (
    <>
      {statusEnviado ? (
        <div className="fixed top-0 left-0 bg-black/70 backdrop-blur-sm w-screen h-screen flex justify-center items-center z-3 ">
          <div className="w-[90%] max-w-md bg-[#000353] flex flex-col items-center py-10 gap-4 rounded-2xl shadow-2xl ">
            <FaCheckCircle className="text-green-600 text-5xl" />
            <p>Creado exitosamente.</p>
          </div>
        </div>
      ) : (
        ""
      )}

      {toggleAgregarProductService ? (
        <div className="contenedorGeneral fixed top-0 left-0 inset-0 bg-black/60 backdrop-blur-sm z-3 flex flex-col items-center justify-center h-screen ">
          <div className="bg-[#000353] w-[90%] max-w-md rounded-xl p-6 shadow-xl relative h-[85vh] overflow-y-auto ">
            <div className="flex justify-center items-center relative w-full pb-5">
              <h3 className="text-center font-semibold whitespace-nowrap text-xl ">
                Agregar Producto/Serv..
              </h3>
              <button
                style={{ background: "transparent" }}
                onClick={handleProductService}
                className="absolute -right-5"
              >
                X
              </button>
            </div>
            <hr className="pb-5 " />

            <div>
              <div className="mb-5">
                <label className="text-sm font-semibold">
                  Selecciona tipo:
                </label>
                <select
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 text-[white] "
                  onChange={(e) => setProductoServicio(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Selecciona --
                  </option>

                  <option className="text-black " value="producto">
                    producto
                  </option>
                  <option className="text-black " value="servicio">
                    servicio
                  </option>
                </select>
              </div>

              {/* formulario unico para enviar a productos  */}
              {productoServicio === "producto" && (
                <div className="animate-fadeIn">
                  <form
                    onSubmit={handleProductSubmit}
                    className="flex flex-col gap-3"
                  >
                    <label className="text-sm font-semibold">Categoría:</label>
                    <select
                      required
                      defaultValue=""
                      onChange={(e) => setCategoria_ID(Number(e.target.value))}
                      className="w-full p-3 border rounded-lg mt-1 mb-4 text-[white] "
                    >
                      <option value="" disabled>
                        -- Selecciona --
                      </option>
                      {productCategories.map((ps) => (
                        <option
                          key={ps.categoria_ID}
                          value={ps.categoria_ID}
                          className="text-black"
                        >
                          {ps.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="file"
                      multiple
                      className="p-3 border rounded-lg bg-white text-black cursor-pointer"
                      accept="image/*"
                      required
                      onChange={(e) =>
                        setImagenProducto(Array.from(e.target.files))
                      }
                    />

                    <input
                      type="text"
                      required
                      placeholder="Nombre"
                      value={nombreProducto}
                      onChange={(e) => setNombreProducto(e.target.value)}
                      className="p-3 border rounded-lg"
                    />

                    <textarea
                      placeholder="Descripción"
                      required
                      value={descripcionProducto}
                      onChange={(e) => setDescripcionProducto(e.target.value)}
                      className="p-3 border rounded-lg h-24"
                    ></textarea>
                    <input
                      type="number"
                      required
                      placeholder="Precio"
                      value={precioProducto}
                      onChange={(e) => setPrecioProducto(e.target.value)}
                      className="p-3 border rounded-lg"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Stock"
                      value={stockProducto}
                      onChange={(e) => setStockProducto(e.target.value)}
                      className="p-3 border rounded-lg"
                    />
                    <input
                      type="number"
                      required
                      placeholder="numero de inventario"
                      readOnly
                      value={categoria_ID}
                      className="p-3 border rounded-lg"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Colores"
                      value={coloresProducto}
                      onChange={(e) =>
                        setColoresProducto(e.target.value.split(","))
                      }
                      className="p-3 border rounded-lg"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Alto"
                      value={dimencionesProducto.alto}
                      onChange={(e) =>
                        setDimencionesProducto({
                          ...dimencionesProducto,
                          alto: e.target.value,
                        })
                      }
                      className="p-3 border rounded-lg"
                    />

                    <input
                      type="text"
                      required
                      placeholder="Ancho"
                      value={dimencionesProducto.ancho}
                      onChange={(e) =>
                        setDimencionesProducto({
                          ...dimencionesProducto,
                          ancho: e.target.value,
                        })
                      }
                      className="p-3 border rounded-lg"
                    />

                    <input
                      type="text"
                      required
                      placeholder="Largo"
                      value={dimencionesProducto.largo}
                      onChange={(e) =>
                        setDimencionesProducto({
                          ...dimencionesProducto,
                          largo: e.target.value,
                        })
                      }
                      className="p-3 border rounded-lg"
                    />

                    <button
                      type="submit"
                      disabled={isDiseabledProduct}
                      style={isDiseabledProduct ? btnDisabled : btnActive}
                      className="bg-[#000353] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
                    >
                      Guardar Producto
                    </button>
                  </form>
                  {loading ? (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg px-8 py-6 flex flex-col items-center gap-4 shadow-lg">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

                        <p className="text-sm font-medium text-gray-700">
                          Creando el producto, por favor espere…
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
              {/* formulario unico para mandar a servicios  */}
              {productoServicio === "servicio" && (
                <div className="animate-fadeIn">
                  <form
                    onSubmit={handleServiceSubmit}
                    className="flex flex-col gap-3"
                  >
                    <label className="text-sm font-semibold">Categoría:</label>
                    <select
                      onChange={(e) => setCategoria_ID(e.target.value)}
                      required
                      defaultValue=""
                      className="w-full p-3 border rounded-lg mt-1 mb-4 text-[white] "
                    >
                      <option value="" className="text-black">
                        ---Selecciona---
                      </option>
                      {serviceCategories.map((ps) => (
                        <option
                          key={ps.categoria_ID}
                          value={ps.categoria_ID}
                          style={{ color: "black" }}
                        >
                          {ps.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      required
                      placeholder="Nombre"
                      value={nombreService}
                      onChange={(e) => setNombreService(e.target.value)}
                      className="p-3 border rounded-lg"
                    />

                    <input
                      type="file"
                      // multiple
                      required
                      accept="image/*"
                      onChange={(e) => setImagenService(e.target.files[0])}
                      className="p-3 border rounded-lg bg-white text-black"
                    />

                    <textarea
                      required
                      placeholder="Descripción del servicio"
                      value={descripcionServicio}
                      onChange={(e) => setDescripcionServicio(e.target.value)}
                      className="p-3 border rounded-lg h-24"
                    ></textarea>

                    <button
                      type="submit"
                      disabled={isDiseabledService}
                      style={isDiseabledService ? btnDisabled : btnActive}
                      className="bg-[#000353] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
                    >
                      Guardar Servicio
                    </button>
                  </form>
                  {loading ? (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg px-8 py-6 flex flex-col items-center gap-4 shadow-lg">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

                        <p className="text-sm font-medium text-gray-700">
                          Creando el Servicio, por favor espere…
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
