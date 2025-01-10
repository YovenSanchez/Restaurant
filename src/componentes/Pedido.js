import swal from "sweetalert";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = "http://localhost:8080/Servicios/pedido/";
const URI2 = "http://localhost:8080/Servicios/menu/";
const URI1 = "http://localhost:8080/Servicios/pedido_menu/";
const URI3 = "http://localhost:8080/Servicios/cliente/";

const Pedido = () => {
    // eslint-disable-next-line no-unused-vars
    const [menus, setMenus] = useState([]);
    const [pedido, setPedido] = useState("");
    const [id_pedido, setId_pedido] = useState(sessionStorage.getItem("id_pedido"));
    const [id_menu, setId_menu] = useState("");
    const [valor, setValor] = useState("");
    const [fecha, setFecha] = useState("");
    const [cliente, setCliente] = useState(sessionStorage.getItem("id_cliente"));
    const [valortotal, setValortotal] = useState(0);
    const [estado, setEstado] = useState("iniciado");
    const {id} = useParams();
    const [pedidos, setPedidos] = useState([]);
    const [pedidos2, setPedidos2] = useState([]);
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [menu, setMenu] = useState("");
    const [id_pedido_menu, setId_pedido_menu] = useState(0);
    const [direccion, setDireccion] = useState("");

    useEffect(() => { 
        fetchCliente();
        getMenus();
        getVisualizador();
        console.log(sessionStorage.getItem("id_pedido"));
    }, []);

    const getVisualizador = async () => { 
        try {
            const res = await axios({
                method: "GET",
                url: URI1 + "visualizarPedido/" + sessionStorage.getItem("id_pedido")
                
            });
            setPedidos2(res.data);
            if (res.data === 0) {
                console.log("sin datos");
                setPedidos2([]); 
              
                console.log("Datos recibidos:", res.data);
            }
        } catch (error) {
            console.error("No tiene Acceso a esta Opciónes!", "Presiona el botón!", "error");
            setPedidos2([]);
        }
    };
    

    const fetchCliente = async () => { 
        try { 
            const response = await axios({
                method: "GET",
                url: URI3 + "list/" + sessionStorage.getItem("id_cliente")
            });
            setDireccion(response.data.direccion); 
        
        } catch (error) { 
            console.error('Error obteniendo los datos del cliente:', error); 
        } 
    }; 

    const guardar = async (e) => {
        e.preventDefault();
        const valorMenu = parseInt(e.target[0].value) * parseInt(e.target[3].value);
        const nuevoValorTotal = parseInt(valortotal) + parseInt(valorMenu);  // Calcula el nuevo valor total como número
        console.log("ID del menú:", e.target[2].value);
        console.log("Valor del menú:", valorMenu,valortotal);
        console.log("Nuevo valor total:", nuevoValorTotal);
    
        const menu_pedido = { 
            pedido: {id_pedido: parseInt(sessionStorage.getItem('id_pedido'))}, 
            menu: {id_menu: parseInt(e.target[2].value)}, 
            cantidad: parseInt(cantidad), 
            valortotal: valorMenu 
        };
    
        try { 
            console.log(menu_pedido);
            await axios.post(URI1, menu_pedido); 
            console.log('Menú insertado en el pedido'); 
            await actualizarValorPedido(nuevoValorTotal); // Actualiza el valor total
            setValortotal(nuevoValorTotal);  // Actualiza el estado local
            swal("Menú agregado al pedido con éxito", "", "success"); 
            getPedidoById(); 
        } catch (error) { 
            console.error('Error al agregar el menú al pedido:', error);
            swal("Error al agregar el menú al pedido", "Presiona el botón", "error"); 
        }
        getVisualizador();
    };
    

    const actualizarValorPedido = async (nuevoValorTotal) => {
        try { 
            const pedidoActualizado = { 
                id_pedido: sessionStorage.getItem('id_pedido'), 
                valor_pedido: nuevoValorTotal 
               
            };
    
            console.log("Actualizando pedido con:", pedidoActualizado);
            await axios.put(`${URI}`, pedidoActualizado);
            console.log('Valor del pedido actualizado:', pedidoActualizado);
        } catch (error) { 
            console.error('Error al actualizar el valor del pedido:', error);
            swal("Error al actualizar el valor del pedido", "Presiona el botón", "error"); 
        }
    };
    

    const getMenus = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: URI2 + "list"
            });
            setMenus(res.data);
            console.log(res.data);
        } catch (error) {
            console.log('Error al obtener los menús:', error);
        }
    };

    const getPedidoById = async () => {
        // try {
        //     const res = await axios({
        //         method: "GET",
        //         url: URI1 + "visualizarPedido?idp=" + sessionStorage.getItem("id_pedido")
        //     });
        //     setPedidos(res.data);
        //     console.log(res.data + 'idPedido');
        // } catch (error) {
        //     console.log("No tiene Acceso a esta Opciónes!", "Presiona el botón!", "error");
        // }
    };


    const EliminarPedido = async (e) => {
    //   const  id = e.target[0].value;
    const id = e.target[0].value; 
    const cantidad = e.target[1].value; 
    const valor = e.target[2].value; 
    const valorMenu = parseInt(valor) * parseInt(cantidad); 
    const nuevoValorTotal = parseInt(valortotal) - parseInt(valorMenu); 
    e.preventDefault(); 
    console.log(nuevoValorTotal);
    console.log(valorMenu);
    console.log(cantidad);
    console.log(valor);
    try { 
        setId_pedido_menu(id); 
        await axios.delete(`${URI1}${id}`); 
        await actualizarValorPedido(nuevoValorTotal);
        
         setValortotal(nuevoValorTotal); 
        
         swal("Menú eliminado del pedido con éxito", "", "success"); 
         getVisualizador(); 
         } catch (error) { 
         console.error('Error al cancelar el menú:', error); 
    swal("Error al cancelar el menú", "Presiona el botón", "error"); 
}

           
          
        
        

        getVisualizador();
        // setId_pedido_menu(0);
    };

    const salir = () => {
      setValortotal (0);
      alert("hola");
    };
    return (
        <div className="container-fluid" width="100%" height="40%">
            <div className="border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-lg-block bg-register-image">
                            <div className="p-5">
                                <div className="text-center">
                                    <button className="dangerous" onClick={salir}>
                                        salir
                                    </button>
                                    <h1 className="h4 text-gray-900 mb-4">Menús</h1>
                                </div>
                                <div className="form-group">
                                    <div className="form-group">
                                        <table className="table">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Valor</th>
                                                    <th colSpan="2"><center>Solicitar</center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                {menus.map((menu) => (
                                                    <tr key={menu.id}>
                                                        <td>
                                                            <ul className="menu">
                                                                <li>
                                                                    <a href="#0">
                                                                        <span>{menu.nombre}</span>
                                                                        <span>
                                                                            <i className="fas fa-address-card" aria-hidden="true"></i>
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>{menu.precio}</td>
                                                        <td>
                                                            <form onSubmit={guardar}>
                                                                <input type="number" className="form-control" onChange={(e) => setCantidad(e.target.value)} required onInvalid={(e) => e.target.setCustomValidity('El campo cantidad es obligatorio')} onInput={e => e.target.setCustomValidity('')} />
                                                                <input type="hidden" className="form-control" onChange={(e) => setNombre(e.target.value)} required value={menu.nombre} />
                                                                <input type="hidden" className="form-control" onChange={(e) => setId_menu(e.target.value)} required value={menu.id_menu} />
                                                                <input type="hidden" className="form-control" onChange={(e) => setValor(e.target.value)} required value={menu.precio} />
                                                                <button type="submit" className="btn btn-primary">Guardar</button>
                                                            </form>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
            <div>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>Producto</th>
                            <th>Valor</th>
                            <th colSpan="2"><center>Solicitar</center></th>
                        </tr>
                    </thead>
           
                    <tbody>
    {pedidos2.length > 0 ? (
        pedidos2.map(pedido => (
            <tr key={pedido.id_pedido_menu}>
                <td>
                    <ul className="menu">
                        <li>
                            <a href="#0">
                                <span>{pedido.menu.nombre}</span>
                                <span>
                                    <i className="fas fa-address-card" aria-hidden="true"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </td>
                <td>{pedido.valortotal}</td>
                <td>
                    <form onSubmit={EliminarPedido}>
                        <input type="hidden" className="form-control" onChange={(e) => setId_pedido_menu(e.target.value)} required value={pedido.id_pedido_menu} />
                        <input type="hidden" className="form-control" onChange={(e) => setCantidad(e.target.value)} required value={pedido.cantidad} />
                        <input type="hidden" className="form-control" onChange={(e) => (e.target.value)} required value={pedido.valortotal} />
                        <button type="submit" className="btn btn-primary">Eliminar</button>
                    </form>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3">No hay productos</td>
        </tr>
    )}
</tbody>

                </table>
            </div>
        </div>
    );
    


};


export default Pedido;
