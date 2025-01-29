import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1500995617113-cf789362a3e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mundo Mágico Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              Bienvenido a Mundo Mágico
            </h1>
            <p className="text-2xl mb-8">
              Los mejores juguetes para tus pequeños
            </p>
            <Link to="product-catalog" className="btn-primary">Ver Juguetes</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
