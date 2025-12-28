import React, { useState } from "react";
import { FiLogOut, FiMoon } from "react-icons/fi";

export default function LogoutPopup({ open, onClose, onConfirm }) {
  const [popUpCerrar, setPopUpCerrar] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed right-6 top-20 z-50">
      {/* MENU */}
      <div className="bg-white w-64 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
        {/* HEADER */}
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-xs text-gray-400">Cuenta</p>
          <p className="text-sm font-semibold text-[#000353]">
            Opciones de usuario
          </p>
        </div>

        {/* OPCIONES */}
        <div className="p-2 flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition text-gray-700">
            <FiMoon className="text-lg" />
            <span className="text-sm font-medium">Modo oscuro</span>
          </button>

          {localStorage.getItem("token") && (
            <button
              onClick={() => setPopUpCerrar(true)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-red-50 transition text-red-600"
            >
              <FiLogOut className="text-lg" />
              <span className="text-sm font-medium">Cerrar sesión</span>
            </button>
          )}
        </div>
      </div>

      {/* MODAL CONFIRMACION */}
      {popUpCerrar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-2xl animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              ¿Cerrar sesión?
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Esta acción te desconectará de tu cuenta actual.
            </p>

            <div className="flex justify-end gap-3">
              <button
              style={{background: '#d7d7d7'}}
                onClick={() => {
                  onClose();
                  setPopUpCerrar(false);
                }}
                className="px-5 py-2 rounded-xl border text-gray-700 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>

              <button
              style={{background: 'red'}}
                onClick={onConfirm}
                className="px-5 py-2 rounded-xl text-white hover:bg-red-700 transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
