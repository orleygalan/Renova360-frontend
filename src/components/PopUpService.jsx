import Footer from "./footer";

export default function PopUpService({
  setServicioSeleccionado,
  servicioSeleccionado,
}) {

  const numeroWhatsapp = "573117350824";
  const mensajeWhatsapp = "¡Hola! Estoy interesado en tu servicio.";

  return (
    <div className="font-sans overflow-y-auto">
      <div className="overflow-y-auto h-screen">
        {/*Hero */}
        <div className="h-screen relative">
          {/* Fondo */}
          <div
            className="absolute inset-0 bg-gray-200 bg-cover bg-center"
            style={{
              backgroundImage: `url(${servicioSeleccionado.video_principal})`,
            }}
          ></div>


          <div className="absolute inset-0 bg-gray-900/90 bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
            {/* boton de cerrar */}
            <button
              onClick={() => setServicioSeleccionado(null)}
              className="fixed top-5 right-5 text-amber-600 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full font-bold"
            >
              X
            </button>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {servicioSeleccionado.categoria_nombre}
            </h1>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              ¡Servicio Premium para Ti!
            </h3>
            <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl">
              {" "}
              {servicioSeleccionado.descripcion_nombre}{" "}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:+57${numeroWhatsapp}`}
                style={{ color: "orange" }}
                className="bg-white text-amber-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
              >
                Llamar Ahora
              </a>
              <a
                href={`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
                  mensajeWhatsapp
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* beneficios */}
        <section className="py-20 px-4 bg-white text-center">
          <h2 className="text-3xl font-bold mb-5">¿Por qué elegirnos?</h2>
          <p className="text-lg md:text-2xl text-gray-800 mb-8">
            Ofrecemos soluciones rápidas y efectivas. Contáctanos ahora y mejora
            tu experiencia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Rápido y Eficiente</h3>
              <p>
                Atendemos tus necesidades en tiempo récord con calidad
                garantizada.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p>Estamos disponibles siempre que nos necesites, sin excusas.</p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Profesionales Expertos
              </h3>
              <p>
                Nuestro equipo cuenta con experiencia y dedicación para tu
                tranquilidad.
              </p>
            </div>
          </div>
        </section>

        {/* llamada a la acción final */}
        <section className="py-20 bg-gray-100 text-gray-800 text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para mejorar tu experiencia?
          </h2>
          <p className="mb-8">
            Contáctanos ahora y obtén atención personalizada inmediata.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:+57${numeroWhatsapp}`}
              style={{ color: "orange" }}
              className="bg-white text-amber-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
              Llamar Ahora
            </a>
            <a
              href={`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
                mensajeWhatsapp
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
