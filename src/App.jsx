import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import MiCuenta from "./pages/MiCuenta";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "./components/NotFound404";
import UnderConstruction from "./components/UnderConstruction";
import ProductDetail from "./components/catalogo/ProductDetail";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import { AppProviders } from "./context/AppProviders";
import ConfirmacionOrden from "./components/checkout/ConfirmacionOrden";
import CatalogoProductos from "./pages/CatalogoProductos";
import Favoritos from "./pages/Favoritos";

function App() {
  return (
    <AuthProvider>
      <AppProviders>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mi-cuenta" element={<MiCuenta />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmacion-orden" element={<ConfirmacionOrden />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/product-catalog" element={<CatalogoProductos />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/ofertas" element={<UnderConstruction />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppProviders>
    </AuthProvider>
  );
}

export default App;
