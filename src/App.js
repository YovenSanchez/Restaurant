
import './App.css';
import MenuPpal from "./componentes/Menu"
import Login from "./componentes/Login"
import Pedido from "./componentes/Pedido"
import Pedidos from "./componentes/Pedidos"
import Cliente from "./componentes/Cliente"
import NuevoPedido from "./componentes/nuevoPedido"
import Productos from "./componentes/Productos"
// import Cliente from "./componentes/Cliente"
import{BrowserRouter,Route,Routes} from "react-router-dom" 
function App() {
  return (
    <div className="App">
   <div className='App-header'>
<MenuPpal/>
<BrowserRouter>
<Routes>
  <Route path="/login"element={<Login/>} />
  <Route path="/Pedido"element={<Pedido/>} />
  <Route path="/Pedidos"element={<Pedidos/>} />
  <Route path="/Cliente"element={<Cliente/>} />
  <Route path="/NuevoPedido"element={<NuevoPedido/>} />
  <Route path="/Productos"element={<Productos/>} />
  {/* <Route path="/Cliente"element={<Cliente/>} /> */}
</Routes>
</BrowserRouter>
   </div>
    </div>
  );
}

export default App;
