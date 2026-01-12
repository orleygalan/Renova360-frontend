import { IoArrowBack } from "react-icons/io5";
import { FaWhatsapp, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import Footer from "./footer";

export default function PopUpService({
  setServicioSeleccionado,
  servicioSeleccionado,
}) {
  if (!servicioSeleccionado) return null;

  const telefono = "573117350824";
  const mensajeWhatsapp = `Hola, estoy interesado en el servicio de ${servicioSeleccionado.categoria_nombre}`;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 text-white font-sans overflow-y-auto">
      {/* hero  */}
      <section className="relative min-h-screen flex items-center">
        <img
          src={servicioSeleccionado.video_principal}
          alt="Servicio"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-black/60" />

        {/* btn volver  */}
        <button
          onClick={() => setServicioSeleccionado(null)}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition"
        >
          <IoArrowBack size={18} />
          Volver
        </button>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* texto principal  */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold tracking-wide bg-amber-400/10 text-amber-400">
              {servicioSeleccionado.categoria_nombre}
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              {servicioSeleccionado.nombre_empresa}
            </h1>

            <p className="text-xl md:text-2xl font-semibold text-amber-400 mb-4">
              Soluciones profesionales cuando más las necesitas
            </p>

            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              Atención inmediata, resultados visibles y un servicio en el que
              puedes confiar.
              {/* {servicioSeleccionado.descripcion_nombre} */}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:+${telefono}`}
                style={{ color: "black" }}
                className="px-7 py-4 rounded-xl bg-white font-bold hover:scale-105 transition flex items-center gap-2"
              >
                <FaPhoneAlt />
                Llamar ahora
              </a>

              <a
                href={`https://wa.me/${telefono}?text=${encodeURIComponent(
                  mensajeWhatsapp
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-xl bg-green-500 font-extrabold hover:scale-105 transition flex items-center gap-2"
              >
                <FaWhatsapp />
                Hablar ahora por WhatsApp
              </a>
            </div>
          </div>

          {/* generar confianza  */}
          <div className="hidden md:block">
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold mb-4">
                ¿Por qué confiar en este servicio?
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-amber-400" />
                  Atención inmediata
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-amber-400" />
                  Resultados visibles
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-amber-400" />
                  Servicio confiable
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* dolor  */}
      <section className="py-24 bg-neutral-950 text-center px-6">
        <h2 className="text-4xl font-extrabold mb-6">
          ¿Cansado de perder tiempo con servicios que no cumplen?
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Aquí encuentras atención real, resultados claros y un servicio pensado
          para ti.
        </p>
      </section>

      {/* beneficios  */}
      <section className="py-24 bg-neutral-950 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Atención inmediata",
              text: "Te respondemos rápido y actuamos sin demoras.",
            },
            {
              title: "Resultados visibles",
              text: "Notas la diferencia desde el primer servicio.",
            },
            {
              title: "Servicio confiable",
              text: "Cumplimos lo que prometemos, sin excusas.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition"
            >
              <h3 className="text-xl font-bold mb-3 text-amber-400">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* proceso  */}
      <section className="py-24 bg-gradient-to-b from-neutral-900 to-neutral-950 px-6">
        <h2 className="text-4xl font-extrabold text-center mb-14">
          ¿Cómo funciona?
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            "Nos escribes o llamas",
            "Evaluamos tu necesidad",
            "Realizamos el servicio",
            "Disfrutas el resultado",
          ].map((step, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-black w-10 h-10 rounded-full flex items-center justify-center font-extrabold">
                {i + 1}
              </span>
              <p className="mt-6 font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* final  */}
      <section className="py-28 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-center px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Agenda hoy y recibe atención inmediata
        </h2>

        <p className="text-lg mb-10 font-medium">
          No lo dejes para después. Escríbenos ahora.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href={`tel:+${telefono}`}
            style={{ color: "white" }}
            className="px-7 py-4 rounded-xl bg-black font-bold hover:scale-105 transition flex items-center gap-2"
          >
            <FaPhoneAlt />
            Llamar ahora
          </a>

          <a
            href={`https://wa.me/${telefono}?text=${encodeURIComponent(
              mensajeWhatsapp
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-xl bg-green-500 font-extrabold hover:scale-105 transition flex items-center gap-2"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
