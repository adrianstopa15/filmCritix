import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <section className="navbar mb-12">
      <nav className="global-navbar-container">
        <NavLink to="/">
          <p className="pNavbar text-2xl lg:text-4xl font-bold">
            Film<span className="text-red-500">Critix</span>
          </p>
        </NavLink>
      </nav>
    </section>
  );
}
