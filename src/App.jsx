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
import Checkout from "./pages/Checkout"; // Asegúrate de que este componente esté importado
import { AppProviders } from "./context/AppProviders";
import ConfirmacionOrden from "./components/checkout/ConfirmacionOrden";
import CatalogoProductos from "./pages/CatalogoProductos";
import Favoritos from "./pages/Favoritos";
import { Elements } from "@stripe/react-stripe-js"; // Importar Elements
import { loadStripe } from "@stripe/stripe-js"; // Importar loadStripe
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Cargar Stripe con tu clave pública
const stripePromise = loadStripe("pk_test_51QTBiWGVrTx2ekztCLwpc8YlJZrdvWqNBXV2eqKEAAUNaJjsgCBNkT6aFTHSia74t2G8V1vuEhLYgspETmHMCUTP00Ub5Lk2kr");

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
              
              {/* Envolver Checkout con Elements */}
              <Route path="/checkout" element={
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              } />
              
              <Route path="/confirmacion-orden" element={<ConfirmacionOrden />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/product-catalog" element={<CatalogoProductos />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/ofertas" element={<UnderConstruction />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </AppProviders>
    </AuthProvider>
  );
}

export default App;
