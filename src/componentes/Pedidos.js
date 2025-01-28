import swal from "sweetalert";
import axios from "axios";
import { useState, useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
const URI = "http://localhost:8080/Servicios/pedido/";


const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidos2, setPedidos2] = useState([]);
    const navigate = useNavigate();
    if (sessionStorage.getItem("id_cliente")==="0" || !sessionStorage.getItem("id_clientes") ) {
        // navigate("/login");
    }
    useEffect(() => {
        getPedidoById();
        getPedidoByEstado();
    }, []);

    const getPedidoById = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: URI + "visualizarPedidos/" + sessionStorage.getItem("id_cliente")
                 });

            // Filtrar los pedidos que no tienen el estado "Iniciado"
            const pedidosFiltrados = res.data.filter((pedido) => pedido.estado !== "Iniciado");

            if (pedidosFiltrados.length === 0) {
                console.log("sin datos");
                setPedidos2([]);
            } else {
                setPedidos2(pedidosFiltrados);
                console.log("Datos recibidos:", pedidosFiltrados);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("sin datos");
                setPedidos2([]);
            } else {
                swal("No tiene Acceso a esta Opciónes!", "Presiona el botón!", "error");
                setPedidos2([]);
            }
        }
    };

    const getPedidoByEstado = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: URI + "visualizarPedidos/" + sessionStorage.getItem("id_cliente"),
            });

            // Filtrar los pedidos que no tienen el estado "Iniciado"
            const pedidosFiltrados = res.data.filter((pedido) => pedido.estado !== "CERRADO");

            if (pedidosFiltrados.length === 0) {
                console.log("sin datos");
                setPedidos([]);
            } else {
                setPedidos(pedidosFiltrados);
                // console.log("Datos recibidos:", pedidosFiltrados);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("sin datos");
                setPedidos([]);
            } else {
                // console.error("No tiene Acceso a esta Opciónes!", "Presiona el botón!", "error");
                setPedidos([]);
            }
        }
    };

    return (

            <div
            style={{
                display:'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end'
               
            }}><div
            style={{
                width:'100%',
                background:'aquamarine',
                marginTop:'10px'
            }}
            >
                 <h1> Historial de pedidos</h1>
                </div>
                 <div
                 style={{
                    marginBottom:'15px'
                 }}>
                    
                <h2>En curso</h2>
                </div>
                <table className="table">
                    <thead className="table-dark"
                    
                    >
                        <tr>
                            <th style={{
background: 'green'

                    }}>Pedido</th>
                            <th style={{
background: 'green'

                    }}>Valor</th>
                            <th style={{
background: 'green'

                    }}>Dirección</th>
                            <th style={{
background: 'green'

                    }}>Estado</th>
                            <th style={{
background: 'green'

                    }}>Fecha</th>
                            <th colSpan="2"  style={{
background: 'green'

                    }}>
                                <center>Solicitar</center>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido2,index) => (
                            <tr key={pedido2.id_pedido}>
                                <td>
                                    <ul className="menu">
                                        <li>
                                            <a href="#0">
                                                 <span>{index + 1}
                                                 </span>
                                                <span>
                                                    <i className="fas fa-facture" aria-hidden="true"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </td>
                                <td>{pedido2.valor_pedido}</td>
                                <td>{pedido2.direccion}</td>
                                <td>TERMINADO</td>
                                <td>{pedido2.fecha}</td>
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>Finalizados</h2>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                        <th>Pedido</th>
                            <th>Valor</th>
                            <th>Dirección</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos2.map((pedido2, index) => (
                            <tr key={pedido2.id_pedido}>
                                <td>
                                    <ul className="menu">
                                        <li>
                                            <a href="#0">
                                                 <span>{index + 1}</span>
                                                <span>
                                                    <i className="fa fa-chart-user" aria-hidden="true"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </td>
                                <td>{pedido2.valor_pedido}</td>
                                <td>{pedido2.direccion}</td>
                                <td>TERMINADO</td>
                                <td>{pedido2.fecha}</td>
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
   
    );
};

export default Pedidos;
