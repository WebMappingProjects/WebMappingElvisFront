import { Outlet } from "react-router-dom";

// components

import FooterSmall from "../components/Footers/FooterSmall";
import Navbar from "../components/Navbars/IndexNavbar";

// views

export default function Auth() {
  return (
    <>
      {/* <Navbar transparent /> */}
      <Navbar fixed />
      <main>
        <section className="relative w-full h-full py-20 bg-gradient-to-br from-blue-50 to-blue-100">
          {/* <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-primary-dark bg-full"
            // style={{
            //   backgroundImage:
            //     "url(" + require("assets/img/register_bg_2.png").default + ")",
            // }}
          ></div> */}
          <Outlet />
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
