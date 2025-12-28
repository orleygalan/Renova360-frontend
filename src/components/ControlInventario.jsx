export default function ControlInventario({toggleInventario, handleInventario}) {
  return (
    <>
      {toggleInventario ? (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
         
          <div className="bg-[#000353] w-[90%] max-w-md rounded-xl p-6 shadow-xl relative">
            
            <button
              onClick={handleInventario}
              className="absolute top-3 right-3 text-[white] hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center text-[#FFFF]">
              Control de Inventario
            </h2>

            <form
            //   onSubmit={handleGuardarInventario}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                required
                placeholder="Nombre del producto..."
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                required
                placeholder="Cantidad disponible..."
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                required
                placeholder="Precio del producto..."
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                required
                placeholder="Categoría / Tipo..."
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                required
                placeholder="Descripción del producto..."
                className="p-3 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <input
                type="file"
                required
                accept="image/*"
                className="p-3 border rounded-lg bg-gray-50 cursor-pointer"
              />

              <button
                type="submit"
                className="bg-[#000353] text-white p-3 rounded-lg hover:bg-blue-900 transition font-semibold"
              >
                Guardar producto
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
