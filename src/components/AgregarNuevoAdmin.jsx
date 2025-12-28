import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function AgregarNuevoAdmin({
  setToggleAgregarAdmin,
  toggleAgregarAdmin,
  handleAddAdmin,
}) {
  const [emailNuevoAdmin, setEmailNuevoAdmin] = useState("");
  const [statusAgregado, setStatusAgregado] = useState("");

  useEffect(() => {
    document.body.style.overflow = toggleAgregarAdmin ? "hidden" : "auto";
  }, [toggleAgregarAdmin]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailNuevoAdmin.trim()) {
      alert("Debes ingresar un correo.");
      return;
    }

    // console.log("Nuevo admin a registrar:", emailNuevoAdmin);

    fetch(
      "https://renova360-backend-production.up.railway.app/usuarios?action=agregar_admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: emailNuevoAdmin,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta del backend", data);

        if (data.status === "ok") {
          setEmailNuevoAdmin("");
          setStatusAgregado("agregado");
        } else {
          setEmailNuevoAdmin("");
          setStatusAgregado("error");
        }

        setTimeout(() => {
          setToggleAgregarAdmin(false);
          setStatusAgregado(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error :", err);
      });
  };

  const isDisabledAdmin = !emailNuevoAdmin;

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
      {toggleAgregarAdmin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-[#000353] w-[90%] max-w-md p-6 rounded-xl shadow-lg">
            <button
              onClick={handleAddAdmin}
              style={{ background: "transparent" }}
              className="text-white text-lg font-semibold mb-3 hover:text-red-400 transition"
            >
              ✕
            </button>

            <h2 className="text-white text-md md:text-xl font-bold mb-4 whitespace-nowrap text-center">
              Agregar un nuevo administrador
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                required
                placeholder="Correo del nuevo administrador"
                value={emailNuevoAdmin}
                onChange={(e) => setEmailNuevoAdmin(e.target.value)}
                className="p-3 rounded-lg bg-white text-black outline-none"
              />

              <button
                type="submit"
                disabled={isDisabledAdmin}
                style={isDisabledAdmin ? btnDisabled : btnActive}
                className="text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Agregar Nuevo Administrador
              </button>
            </form>
          </div>
          {statusAgregado === "agregado" ? (
            <div className="fixed top-0 left-0 bg-black/70 backdrop-blur-sm w-screen h-screen flex justify-center items-center z-3 ">
              <div className="w-[90%] max-w-md bg-[#000353] flex flex-col items-center py-10 gap-4 rounded-2xl shadow-2xl ">
                <FaCheckCircle className="text-green-600 text-5xl" />
                <p>Nuevo Administrador agregado exitosamente.</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {statusAgregado === "error" ? (
            <div className="fixed top-0 left-0 bg-black/70 backdrop-blur-sm w-screen h-screen flex justify-center items-center z-3 ">
              <div className="w-[90%] max-w-md bg-[#000353] flex flex-col items-center py-10 gap-4 rounded-2xl shadow-2xl ">
                <FaTimes className="text-green-600 text-5xl" />
                <p>Correo electronico no encontrado.</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
