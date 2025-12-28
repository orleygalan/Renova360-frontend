export const loginRequest = async (form) => {

    try {
        const response = await fetch(
            "https://renova360-backend-production.up.railway.app/usuarios?action=iniciar_sesion",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            }
        )

        return await response.json()
    } catch (error) {
        console.error("Error de logeo:", error);
    }

}

export const registerRequest = async (form) => {
    try {
        const response = await fetch(
            "https://renova360-backend-production.up.railway.app/usuarios?action=registrar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            }
        );

        return await response.json();
    } catch (error) {
        console.error("Error en el registro:", error);
    }
};

export async function getProfileRequest(token) {
    const res = await fetch("https://renova360-backend-production.up.railway.app/usuarios?action=obtener_perfil", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(token),
    });
    return res.json();
}