import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });
  const [loginError, setLoginError] = useState(false);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redireccionarRegister = () => {
    navigate("/register");
  };

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(form);
      console.log("Respuesta del Backend", data);

      if (data.success) {
        console.log("Haz iniciado sesion correctamente .");
        setLoginError(false);
        navigate(from, { replace: true });
      } else {
        console.log("Datos incorrectos vuelve a intentarlo .");
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !form.correo || !form.contrasena;

  return (
    <>
      <div className="principal min-h-screen w-full flex flex-col justify-center items-center bg-white px-4 z-3 absolute top-0">
        <div className="secundario w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[40vw] pt-10 pb-8 px-10 bg-white rounded-md text-black shadow-2xl">
          <div className="w-full text-center flex flex-col items-center text-black ">
            <FaLock />
            <h2 className="text-[33px] pt-3 font-bold ">Bienvenido de nuevo</h2>
            <p className="pt-5 pb-5 font-medium ">
              Inicia sesion para continuar
            </p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <section className="grid flex-col">
              <label htmlFor="correo" className=" text-[14px] font-medium ">
                Correo electronico
              </label>
              <input
                id="correo"
                name="correo"
                className={`w-full border border-gray-300 p-2 pr-10 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                   loginError
                     ? "border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.6)]"
                     : "border-black"
                 }`}
                type="email"
                placeholder="Orlando"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                required
              />
              {loginError && (
                <p className="text-red-500 text-sm mt-1">
                  Ingresa tus datos correctamente.
                </p>
              )}
            </section>
            <section className="grid flex-col mt-6">
              <div className="flex w-full justify-between">
                <label
                  htmlFor="contrasena"
                  className=" text-[14px] font-medium "
                >
                  Contraseña
                </label>
                <h4 className="text-[blue] text-[10px] grid items-center ">
                  ¿Olvidaste la contraseña?
                </h4>
              </div>
              <div className="relative">
                <input
                  id="contrasena"
                  name="contrasena"
                  className={`w-full border border-gray-300 p-2 pr-10 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                   loginError
                     ? "border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.6)]"
                     : "border-black"
                 }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  value={form.contrasena}
                  onChange={(e) =>
                    setForm({ ...form, contrasena: e.target.value })
                  }
                  required
                />
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
              {loginError && (
                <p className="text-red-500 text-sm mt-1">
                  Ingresa tus datos correctamente.
                </p>
              )}
            </section>
            <section className=" text-center pt-5 ">
              <button
                type="submit"
                disabled={isDisabled}
                style={{
                  background: isDisabled ? "#9CA3AF" : "#2563EB",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  color: "white",
                }}
                className="border border-black bg-[red] p-3 "
              >
                Iniciar Sesion
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
          ¿ No tienes cuenta ?
          <span
            onClick={redireccionarRegister}
            className="text-[blue] cursor-pointer "
          >
            Registrate gratis
          </span>
        </h4>
      </div>
    </>
  );
}
