import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function AgregarNuevoNicho({
  setToggleAgregarNicho,
  toggleAgregarNicho,
  handleAgregarNicho,
}) {
  React.useEffect(() => {
    if (toggleAgregarNicho === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleAgregarNicho]);

  const [nombreNicho, setNombreNicho] = useState("");
  const [nombreSlug, setNombreSlug] = useState("");
  const [serviceProduct, setServiceProduct] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [statusEnvio, setStatusEnvio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const valor = e.target.value;
    setNombreNicho(valor);

    const slug = valor
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setNombreSlug(slug);
  };
  // console.log(nombreNicho);
  // console.log(serviceProduct);
  // console.log(descripcion);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formData = new FormData();

    const data = {
      nombre: nombreNicho,
      tipo: serviceProduct,
      usuario_ID: 1,
      categorySlug: nombreSlug,
      descripcion: descripcion,
    };

    formData.append("data", JSON.stringify(data));
    formData.append("imagen", imagen);

    fetch(
      "https://renova360-backend-production.up.railway.app/nichos?action=agregar_nicho",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setStatusEnvio(data.status);
        console.log("Respuesta del servidor:", data);

        if (data.status === "okey") {
          setNombreNicho("");
          setServiceProduct("");
          setNombreSlug("");
          setDescripcion("");
          setImagen(null);
        }

        setTimeout(() => {
          setStatusEnvio("");
          setToggleAgregarNicho(false);
        }, 2000);
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => {
        setLoading(false);
      });
  };
  const isDisabledNicho =
    !nombreNicho || !serviceProduct || !nombreSlug || !descripcion || !imagen;

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
      {statusEnvio === "okey" && (
        <div className="fixed inset-0 z-3 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-fadeIn">
            {/* icono */}
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full">
                <FaCheckCircle className="text-green-600 text-5xl" />
              </div>
            </div>

            {/* Texto */}
            <h2 className="mt-4 text-center text-2xl font-bold text-gray-800">
              ¡Nicho creado!
            </h2>

            <p className="mt-2 text-center text-gray-500">
              Tu nuevo nicho se ha creado correctamente y ya está disponible.
            </p>
          </div>
        </div>
      )}
      {toggleAgregarNicho ? (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-3">
          <div className="bg-[#000353] w-[90%] max-w-md rounded-xl p-6 shadow-xl relative">
            <button
              onClick={(e) => handleAgregarNicho(e)}
              style={{ background: "transparent" }}
              className="absolute top-3 right-3 text-[white] hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center text-[#FFFF]">
              Agregar nicho
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                value={nombreNicho}
                onChange={handleChange}
                placeholder="Nombre del nicho..."
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                defaultValue=""
                required
                onChange={(e) => setServiceProduct(e.target.value)}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled className="text-[black] ">
                  ----Seleccionar----
                </option>
                <option value="servicio" className="text-[black] ">
                  Servicio
                </option>
                <option value="producto" className="text-[black] ">
                  Producto
                </option>
              </select>

              <input
                type="text"
                required
                value={nombreSlug}
                readOnly
                placeholder="categoriaSlug"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción..."
                className="p-3 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImagen(e.target.files[0])}
                className="p-3 border rounded-lg cursor-pointer"
              />

              <button
                type="submit"
                disabled={isDisabledNicho}
                style={isDisabledNicho ? btnDisabled : btnActive}
                className="p-3 rounded-lg transition font-semibold"
              >
                Guardar nicho
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
