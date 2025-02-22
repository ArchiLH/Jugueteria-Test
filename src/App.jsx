import { Routes, Route } from "react-router-dom"; // Importar Routes y Route de react-router-dom para definir las rutas de la aplicación
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import MiCuenta from "./pages/MiCuenta";
import { AuthProvider } from "./context/AuthContext"; // Importar AuthProvider para proveer el contexto de autenticación a la aplicación
import NotFound from "./components/404/NotFound404";
import UnderConstruction from "./components/404/UnderConstruction";
import ProductDetail from "./components/catalogo/ProductDetail";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout"; // Asegúrate de que este componente esté importado
import { AppProviders } from "./context/AppProviders"; // Importar AppProviders para proveer el contexto de la aplicación
import ConfirmacionOrden from "./components/checkout/ConfirmacionOrden";
import CatalogoProductos from "./pages/CatalogoProductos";
import Favoritos from "./pages/Favoritos";
import { Elements } from "@stripe/react-stripe-js"; // Importar Elements
import { loadStripe } from "@stripe/stripe-js"; // Importar loadStripe
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PagoExitoso from "./pages/PagoExitoso";
import PagoCancelado from "./pages/PagoCancelado";
import Ofertas from "./components/ofertas/Ofertas";

// Cargar Stripe con tu clave pública
const stripePromise = loadStripe(
  "pk_test_51QTBiWGVrTx2ekztCLwpc8YlJZrdvWqNBXV2eqKEAAUNaJjsgCBNkT6aFTHSia74t2G8V1vuEhLYgspETmHMCUTP00Ub5Lk2kr",
);

function App() {
  return (
    <AuthProvider>
      <AppProviders>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mi-cuenta" element={<MiCuenta />} />
              <Route path="/carrito" element={<Carrito />} />

              {/* Envolver Checkout con Elements */}
              <Route
                path="/checkout"
                element={
                  <Elements stripe={stripePromise}>
                    <Checkout />
                  </Elements>
                }
              />

              <Route path="/success" element={<PagoExitoso />} />
              <Route path="/cancel" element={<PagoCancelado />} />

              <Route
                path="/confirmacion-orden"
                element={<ConfirmacionOrden />}
              />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/product-catalog" element={<CatalogoProductos />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/ofertas" element={<Ofertas />} />
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
