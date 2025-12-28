// import { useState } from "react";
import AppRouter from "../router/AppRouter";
// import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  // const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <>
      <div className="w-full z-1 bg-[#D9D9D9] fixed top-0 left-0 md:h-20 h-15 overflow-hidden flex items-center md:block ">
        {/* <button
          onClick={() => setToggleMenu(!toggleMenu)}
          style={{ margin: "0" }}
          className="ml-1 md:hidden z-10 "
        >
          {toggleMenu ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button> */}
        {/* {toggleMenu ? (
          <div className="fixed top-0 left-0 w-full h-screen md:hidden bg-black/80 backdrop-blur-sm flex ">
            <div className="w-[50vw] h-screen bg-[#D9D9D9] ">
              
            </div>
          </div>
        ) : (
          ""
        )} */}
        <div
          style={{
            fontFamily: "Instrument Serif",
          }}
          className="w-full text-[black] text-center text-3xl font-bold"
        >
          Renova360
        </div>
      </div>
      <AppRouter />
    </>
  );
}
