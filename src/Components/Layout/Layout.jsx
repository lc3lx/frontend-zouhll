import React from "react";
import NavBarLogin from "../Uitily/NavBarLogin";
import Footer from "../Uitily/Footer";
import ScrollToTop from "../Uitily/ScrollToTop";
import ZuhalAI from "../AI/ZuhalAI";

const Layout = ({ children, className = "", showAI = true }) => {
  return (
    <div
      className={`theme-bg-secondary ${className}`}
      style={{ minHeight: "100vh" }}
    >
      <NavBarLogin />

      <main className="theme-transition">{children}</main>

      <Footer />
      <ScrollToTop />
      {showAI && <ZuhalAI />}
    </div>
  );
};

export default Layout;
