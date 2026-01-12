import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerUsuarios } from "../services/registerUsuarios";

export const RegisterLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
  });
  const [statusRegister, setStatusRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const redireccionarLogin = () => {
    navigate("/login");
  };
  // const {} = registerUsuarios()
  // console.log(registerUsuarios());
  const validarPassword = (pass) => {
    const errores = [];

    if (pass.length < 8) errores.push("Debe tener mínimo 8 caracteres");
    if (!/[A-Z]/.test(pass)) errores.push("Debe incluir una letra mayúscula");
    if (!/[a-z]/.test(pass)) errores.push("Debe incluir una letra minúscula");
    if (!/[0-9]/.test(pass)) errores.push("Debe incluir un número");
    if (!/[!@#$%^&*]/.test(pass))
      errores.push("Debe incluir un carácter especial");

    return errores;
  };

  const isDisabled =
    !form.nombre || 
    !form.apellido ||
    !form.correo ||
    !password ||
    !confirmPassword ||
    passwordErrors.length > 0 ||
    password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (passwordErrors.length > 0) {
        alert("La contraseña no cumple los requisitos de seguridad");
        return;
      }

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const data = await registerUsuarios(form);
      console.log(data);

      if (data.status === "success") {
        setStatusRegister(true);
      } else {
        setStatusRegister(false);
      }
    } catch (error) {
      setStatusRegister(false);
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="principal min-h-screen w-full flex flex-col justify-center items-center bg-white px-4 py-6 z-3 absolute top-0">
        <div className="secundario w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[40vw] pt-10 pb-8 px-10 bg-white rounded-md text-black shadow-2xl">
          <div className="w-full text-center flex flex-col items-center text-black ">
            <FaLock />
            <h2 className="text-[33px] pt-3 font-bold ">Crea tu cuenta</h2>
            <p className="pt-5 pb-5 font-medium ">
              Únete a nosotros en segundos
            </p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <section className="grid flex-col">
              <label htmlFor="" className=" text-[14px] font-medium ">
                Primer Nombre
              </label>
              <input
                name="nombre"
                className="w-full border border-gray-300 p-2 pr-10 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-gray-500  "
                type="text"
                placeholder="Orlando"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </section>
            <section className="grid flex-col">
              <label htmlFor="" className=" text-[14px] font-medium ">
                Primer Apellido
              </label>
              <input
                name="apellido"
                className="w-full border border-gray-300 p-2 pr-10 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-gray-500 "
                type="text"
                placeholder="Ovalle"
                required
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              />
            </section>
            <section className="grid flex-col">
              <label htmlFor="" className=" text-[14px] font-medium ">
                Correo electronico
              </label>
              <input
                name="correo"
                className="w-full border border-gray-300 p-2 pr-10 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-gray-500 "
                type="email"
                placeholder="Orlando28@tucorro.com"
                required
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
              />
            </section>
            <section className="grid gap-1 mt-4">
              <label className="text-sm font-medium">Contraseña</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 p-2 pr-10 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setPasswordErrors(validarPassword(value));
                    setForm({ ...form, contrasena: value });
                  }}
                  required
                />

                {/* ojo */}
                <button
                  type="button"
                  style={{ padding: "0" }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              {/* Indicaciones visuales */}
              <ul className="text-xs mt-1 space-y-1">
                {passwordErrors.map((error, index) => (
                  <li key={index} className="text-red-500">
                    • {error}
                  </li>
                ))}
              </ul>
            </section>

            <section className="grid gap-1 mt-4">
              <label className="text-sm font-medium">
                Confirmar contraseña
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full border p-2 pr-10 rounded-md focus:outline-none ${
                    confirmPassword && confirmPassword !== password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-500">
                  Las contraseñas no coinciden
                </p>
              )}
            </section>

            <section className=" text-center pt-5 ">
              <button
                type="submit"
                disabled={isDisabled}
                style={{
                  backgroundColor: isDisabled ? "#9CA3AF" : "#2563EB",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
                className="w-full mt-6 text-white py-3 rounded-md font-medium
             hover:bg-blue-700 transition"
              >
                Crear cuenta
              </button>
            </section>
          </form>
          {loading && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg px-8 py-6 flex flex-col items-center gap-4 shadow-lg">
                {/* Spinner */}
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

                <p className="text-sm font-medium text-gray-700">
                  Iniciando sesión, por favor espera…
                </p>
              </div>
            </div>
          )}
        </div>
        <h4 className="text-[#212121] text-[13px] font-medium mt-4 ">
          ¿ Ya tienes cuenta ?
          <span
            onClick={redireccionarLogin}
            className="text-[blue] cursor-pointer "
          >
            Inicia Sesion
          </span>
        </h4>
      </div>
      {statusRegister ? (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center px-4 z-50">
          <div className="bg-white rounded-md p-6 max-w-md text-center">
            <h2 className="font-semibold text-lg">
              Hemos enviado un link a tu correo para verificar tu cuenta.
            </h2>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
