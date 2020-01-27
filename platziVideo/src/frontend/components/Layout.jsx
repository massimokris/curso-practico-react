import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <section className="App">
    <Header />
    {children}
    <Footer />
  </section>
);

export default Layout;
