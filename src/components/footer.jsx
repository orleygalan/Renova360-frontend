import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 w-full">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        
        <div>
          <h2 className="text-2xl font-bold text-white">Renova360</h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Soluciones confiables en remodelación, mantenimiento y servicios profesionales
            para tu hogar o empresa. Calidad, seguridad y eficiencia.
          </p>
        </div>


        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Enlaces</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400 transition">Inicio</a></li>
            <li><a href="/aboutUs" className="hover:text-blue-400 transition">Sobre Nosotros</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contacto</a></li>
          </ul>
        </div>


        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contacto</h3>
          <ul className="space-y-2">
            <li className="flex gap-3 items-center"> <FaMapMarkerAlt />  Valledupar, Cesar – Colombia</li>
            <li className="flex gap-3 items-center"> <FaPhoneAlt /> +57 311 000 0000</li>
            <li className="flex gap-3 items-center"> <FaEnvelope /> contacto@renova360.com</li>
          </ul>
        </div>


        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Síguenos</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-blue-500 transition">
              < FaTiktok className="fa-brands fa-facebook" />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram className="fa-brands fa-instagram" />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebookF className="fa-brands fa-twitter" />
            </a>
            <a href="#">
                <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-6 border-t border-gray-700 text-gray-500 text-sm">
        © {new Date().getFullYear()} Renova360. Todos los derechos reservados.
      </div>
    </footer>
  );
}
