

import swal from "sweetalert";
import axios from "axios";
import {useState, useEffect}  from "react";
import { useNavigate, useParams } from "react-router-dom";
// const URI = "http://localhost:8080/Servicios/pedido/"
// const URI2 = "http://localhost:8080/Servicios/menu/"
const URI1 = "http://localhost:8080/Servicios/pedido_menu/"
// const URI3 = "http://localhost:8080/Servicios/cliente/"
let headers = {
    "cliente" : sessionStorage.getItem("id_cliente")

    // const navigate = useNavigate();


  };

const Pedidos = () => {
    const [estado, setEstado] = useState("iniciado");
useEffect( ()=>{
    getPedidoById()
    getPedidoByestado()
})
    const [pedidos, setPedidos] = useState([])
    const [pedidos2, setPedidos2] = useState([])
const getPedidoById = async () => {
    try {
        
    const res =  await axios({
        method: "GET",
        url: URI1+"visualizarPedido?id_cliente"+sessionStorage.getItem("id_cliente")

       

      });
setPedidos(res.data);
console.log(res.data+'idPedido')
    // } catch (error) {
    //     swal("No tiene Acceso a esta Opción!", "Presiona el butón!", "error");
    //     navigate("/");
    

     } catch(error){
        
        console.log("No tiene Acceso a esta Opciónes!", "Presiona el butón!", "error");
     }
    //alert(URI+"list/"+id)
 
 
  
    // setValor(res.data.Valor)
 
};
const getPedidoByestado = async () => {
  
    try {
        
    const res =  await axios({
        method: "GET",
        url: URI1+"estado?Estado="+estado+"&cliente="+sessionStorage.getItem("id_cliente")
       
    
      });
setPedidos2(res.data);
console.log(res.data+'idPedido')
    // } catch (error) {
    //     swal("No tiene Acceso a esta Opción!", "Presiona el butón!", "error");
    //     navigate("/");
    

     } catch(error){
        
        console.log("No tiene Acceso a esta Opciónes!", "Presiona el butón!", "error");
     }
    //alert(URI+"list/"+id)
 
 
  
    // setValor(res.data.Valor)
 
};
return (
<div>
    en curso
<table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Producto</th>
                                        <th>Valor</th>
                                        <th colSpan="2"><center>Solicitar</center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos2.map((pedido) => (
                                        <tr key={pedido.id_pedido}>
                                            <td>
                                                <ul className="menu">
                                                    <li>
                                                        <a href="#0">
                                                            <span>{pedido.nombre}</span>
                                                            <span>
                                                                <i className="fas fa-address-card" aria-hidden="true"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td>{pedido.valortotal}</td>
                                            
                                            <td>{pedido.fecha}</td>
                                            <td>{pedido.cliente}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            Finalizados
<table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Producto</th>
                                        <th>Valor</th>
                                        <th colSpan="2"><center>Solicitar</center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos.map((pedido) => (
                                        <tr key={pedido.id_pedido}>
                                            <td>
                                                <ul className="menu">
                                                    <li>
                                                        <a href="#0">
                                                            <span>{pedido.nombre}</span>
                                                            <span>
                                                                <i className="fas fa-address-card" aria-hidden="true"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td>{pedido.valortotal}</td>
                                            
                                            <td>{pedido.fecha}</td>
                                            <td>{pedido.cliente}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
</div>
);
};
export default Pedidos;
