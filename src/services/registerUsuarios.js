export const registerUsuarios = async (form) => {
  try {
    const response = await fetch(
      "https://renova360-backend-production.up.railway.app/usuarios?action=registrar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          correo: form.correo,
          contrasena: form.contrasena,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error en el registro:", error);
  }
};