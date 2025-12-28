import { createContext, useContext, useState, useEffect } from "react";
import {
  getProfileRequest,
  loginRequest,
  registerRequest,
} from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario si hay token en localStorage
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfileRequest(token);

        if (data?.perfil?.usuario_ID) {
          setUser(data.perfil);
          console.log("Respuesta del Backend", data);
        } else {
          setToken(null);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
        setToken(null);
        localStorage.removeItem("token");
      }

      setLoading(false);
    }

    loadUser();
  }, [token]);

  async function login(form) {
    try {
      const res = await loginRequest(form);

      if (res.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        const profile = await getProfileRequest(res.token);
        setUser(profile);
        return { success: true };
      }

      return { success: false, error: res.message };
    } catch (error) {
      return { success: false, error: "Error en el servidor" };
    }
  }

  async function register(data) {
    try {
      const res = await registerRequest(data);
      return res; // { success: true/false, message: ... }
    } catch (error) {
      return { success: false, message: "Error del servidor" };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
