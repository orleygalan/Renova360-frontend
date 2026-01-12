import React from "react";
import Footer from "../components/footer";

export default function AboutUs() {
  return (
    <>
      <main className="w-full min-h-screen pt-0 from-white to-gray-100">
        <section className="relative w-full h-[55vh] [@media(min-height:900px)]:h-[40vh] flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
            alt="Sobre Nosotros"
            className="w-full h-full object-cover rounded-b-3xl shadow"
          />
          <div className="absolute inset-0 bg-black/40 rounded-b-3xl"></div>

          <h1 className="absolute text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Sobre Nosotros
          </h1>
        </section>

        <section className="max-w-5xl mx-auto py-16 px-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            ¿Quiénes Somos?
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            En <span className="font-semibold text-blue-700">Renova360</span>,
            nos dedicamos a ofrecer productos y servicios profesionales que
            mejoran la calidad de vida de nuestros clientes. Nuestro enfoque
            está basado en la innovación, la calidad y la satisfacción total de
            quienes confían en nosotros.
          </p>

          <div className="bg-white shadow-md rounded-2xl p-8 mb-10 border">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Nuestra Misión
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Proveer productos y servicios de alta calidad que ayuden a
              nuestros clientes a transformar sus espacios y mejorar su
              bienestar, combinando tecnología, creatividad y atención
              personalizada.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 mb-10 border">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Nuestra Visión
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Convertirnos en una empresa líder en soluciones integrales,
              reconocida por la excelencia en nuestros productos, creatividad y
              compromiso con la innovación continua.
            </p>
          </div>

          {/* VALORES */}
          <div className="bg-white shadow-md rounded-2xl p-8 border">
            <h3 className="text-2xl font-semibold text-gray-800 mb-5">
              Nuestros Valores
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="p-3 border rounded-xl bg-gray-50">
                ✔ Responsabilidad
              </li>
              <li className="p-3 border rounded-xl bg-gray-50">✔ Innovación</li>
              <li className="p-3 border rounded-xl bg-gray-50">
                ✔ Transparencia
              </li>
              <li className="p-3 border rounded-xl bg-gray-50">✔ Respeto</li>
              <li className="p-3 border rounded-xl bg-gray-50">✔ Calidad</li>
              <li className="p-3 border rounded-xl bg-gray-50">
                ✔ Trabajo en Equipo
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
