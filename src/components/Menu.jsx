import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoadCategories } from "../router/useLoadCategories";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FiMenu, FiX } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import LogoutPopup from "./LogoutPopup";

export default function Menu() {
  const { productCategories, serviceCategories, loading, error } =
    useLoadCategories();

  const [openProducts, setOpenProducts] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openCuenta, setOpenCuenta] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const { user } = useAuth();
  const isAdmin = user?.rol === "administrador";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loading) return <nav>Cargando menú...</nav>;
  // if (error) return <nav>Error al cargar el menú</nav>;

  return (
    <>
      <div className="md:hidden fixed top-3 left-3 z-3">
        <button
          style={{ padding: "0", background: "#D9D9D9" }}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <FiX className="text-3xl" />
          ) : (
            <FiMenu className="text-3xl " />
          )}
        </button>
      </div>

      {mobileMenu && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-2 flex">
          <div className="w-[60vw] bg-[#D9D9D9] h-full p-6 animate-slide-right shadow-xl text-black whitespace-nowrap">
            <nav className="flex flex-col gap-5 mt-15">
              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                style={{ color: "black" }}
              >
                Inicio
              </Link>

              <div>
                <hr />
                <button
                  style={{ padding: "0", background: "#D9D9D9" }}
                  className="flex justify-between w-full"
                  onClick={() => setOpenProducts(!openProducts)}
                >
                  Productos {openProducts ? <SlArrowUp /> : <SlArrowDown />}
                </button>
                <hr />
                {openProducts && (
                  <ul className="pl-5 mt-2 flex flex-col gap-2">
                    {productCategories.map((cat) => (
                      <Link
                        key={cat.categoria_ID}
                        to={`/producto/${cat.slug}`}
                        onClick={() => setMobileMenu(false)}
                        style={{ color: "#262323" }}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <hr />
                <button
                  style={{ padding: "0", background: "#D9D9D9" }}
                  className="flex justify-between w-full"
                  onClick={() => setOpenServices(!openServices)}
                >
                  Servicios {openServices ? <SlArrowUp /> : <SlArrowDown />}
                </button>
                <hr />

                {openServices && (
                  <ul className="pl-3 mt-2 flex flex-col gap-2">
                    {serviceCategories.map((cat) => (
                      <Link
                        key={cat.categoria_ID}
                        to={`/servicio/${cat.slug}`}
                        onClick={() => setMobileMenu(false)}
                        style={{ color: "#262323" }}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                to="/aboutUs"
                onClick={() => setMobileMenu(false)}
                style={{ color: "black" }}
              >
                Sobre Nosotros
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenu(false)}
                  style={{ color: "black" }}
                >
                  Panel Admin
                </Link>
              )}

              {!localStorage.getItem("token") && (
                <div>
                  <hr />
                  <button
                    style={{ padding: "0", background: "#D9D9D9" }}
                    className="flex justify-between w-full"
                    onClick={() => setOpenCuenta(!openCuenta)}
                  >
                    Cuenta {openCuenta ? <SlArrowUp /> : <SlArrowDown />}
                  </button>
                  <hr />
                  {openCuenta && (
                    <div className="flex flex-col pl-3 gap-2 mt-2">
                      <Link
                        to="/login"
                        onClick={() => setMobileMenu(false)}
                        style={{ color: "#262323" }}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenu(false)}
                        style={{ color: "#262323" }}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}

      <nav className="hidden md:flex fixed top-10 left-0 w-full h-12 bg-[#D9D9D9] items-center z-1">
        <div className="flex items-center gap-6 ml-6">
          <Link to="/" style={{ color: "black" }}>
            Inicio
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpenProducts(true)}
            onMouseLeave={() => setOpenProducts(false)}
          >
            <button className="flex items-center gap-1">
              Productos {openProducts ? <SlArrowUp /> : <SlArrowDown />}
            </button>

            {openProducts && (
              <ul className="absolute top-10 left-0 bg-[#D9D9D9] shadow-lg rounded p-2">
                {productCategories.map((cat) => (
                  <li key={cat.categoria_ID} className="whitespace-nowrap p-1">
                    <Link to={`/producto/${cat.slug}`} style={{ color: "black" }}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenServices(true)}
            onMouseLeave={() => setOpenServices(false)}
          >
            <button className="flex items-center gap-1">
              Servicios {openServices ? <SlArrowUp /> : <SlArrowDown />}
            </button>

            {openServices && (
              <ul className="absolute top-10 left-0 bg-[#D9D9D9] shadow-lg rounded p-2">
                {serviceCategories.map((cat) => (
                  <li key={cat.categoria_ID} className="whitespace-nowrap p-1">
                    <Link to={`/servicio/${cat.slug}`} style={{ color: "black" }}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/aboutUs" style={{ color: "black" }}>
            Sobre Nosotros
          </Link>

          {isAdmin && (
            <Link to="/admin" style={{ color: "black" }}>
              Panel Admin
            </Link>
          )}
        </div>
        <div className="relative ml-6">
          {!localStorage.getItem("token") && (
            <div
              onMouseEnter={() => setOpenCuenta(true)}
              onMouseLeave={() => setOpenCuenta(false)}
            >
              <button
                style={{ padding: "0" }}
                className="flex items-center gap-1"
              >
                Cuenta {openCuenta ? <SlArrowUp /> : <SlArrowDown />}
              </button>
              {openCuenta && (
                <ul className="absolute -left-5 flex flex-col bg-[#D9D9D9] shadow-lg rounded p-2 px-6">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    style={{ color: "#262323" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenu(false)}
                    style={{ color: "#262323" }}
                    className="mt-3"
                  >
                    Register
                  </Link>
                </ul>
              )}
            </div>
          )}
        </div>

        <div
          className="cursor-pointer ml-auto mr-6"
          onClick={() => setOpenLogout(!openLogout)}
        >
          <BiUser className="text-3xl bg-[#9b9b9b] p-1 rounded-full" />
        </div>
        <LogoutPopup
          open={openLogout}
          onClose={() => setOpenLogout(false)}
          onConfirm={handleLogout}
        />
      </nav>
    </>
  );
}
