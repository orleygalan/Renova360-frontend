import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

export default function Reviews({
  onSubmitReview,
  productoSeleccionado,
}) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // cálculos
  const comentarios = productoSeleccionado?.comentarios || [];
  const total = comentarios.length;

  const average =
    total === 0
      ? 0
      : (comentarios.reduce((acc, c) => acc + c.estrellas, 0) / total).toFixed(
          1
        );

  const ratingCount = (star) =>
    comentarios.filter((c) => c.estrellas === star).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReview({ name, rating, comment });
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* RESUMEN */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Opiniones del producto</h2>

        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold">{average}</span>
          <Stars value={Math.round(average)} />
        </div>

        <p className="text-sm text-gray-500 mt-1">{total} calificaciones</p>

        {/* barras */}
        <div className="mt-4 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="flex text-[13px] items-center gap-1 ">{star} <FaStar /> </span>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-blue-600 h-2 rounded"
                  style={{
                    width: total
                      ? `${(ratingCount(star) / total) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LISTA DE COMENTARIOS */}
      <div className="md:col-span-2 space-y-6">
        {productoSeleccionado.comentarios.map((c) => (
          <div
            key={c.comentario_ID}
            className="bg-white rounded-2xl shadow-md p-5 gap-4 items-start border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="">
                <BiUser className="text-4xl bg-[#9b9b9b] p-1 rounded-full" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex text-yellow-400 text-lg">
                  {[...Array(c.estrellas)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900">{c.usuario}</h4>
            <p className="text-gray-600 leading-relaxed">{c.comentario}</p>
          </div>
        ))}

        {/* FORMULARIO */}
        {/* <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <h3 className="font-semibold text-lg">Escribe tu opinión</h3>

          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {[5, 4, 3, 2, 1].map((s) => (
              <option key={s} value={s}>
                {s} estrellas
              </option>
            ))}
          </select>

          <textarea
            placeholder="Escribe tu comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            style={{background: 'blue', color: 'white'}}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enviar comentario
          </button>
        </form> */}
      </div>
    </div>
  );
}

/* COMPONENTE ESTRELLAS */
function Stars({ value }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg ${
            i <= value ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
}
