import React, { useState, useEffect } from "react";
import pub1 from "../assets/publicidad1.png";
import pub2 from "../assets/publicidad3.png";
import pub3 from "../assets/publicidad2.png";

export default function CarruselPublicidad() {
  const imagenes = [pub1, pub2, pub3, pub1];

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 3000); 

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="w-full h-50 relative overflow-hidden">
      <div
        className="flex w-full h-full transition-transform duration-500"
        style={{ transform: `translateX(-${indice * 100}%)` }}
      >
        {imagenes.map((src, i) => {
          console.log(src);

          return (
            <div key={i} className="w-full flex-shrink-0 h-full">
              <img
                src={src}
                alt={`Publicidad ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
