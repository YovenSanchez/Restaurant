import swal from "sweetalert";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URI = "http://localhost:8080/Servicios/pedido/";
const URI2 = "http://localhost:8080/Servicios/menu/";
const URI1 = "http://localhost:8080/Servicios/pedido_menu/";
// const URI3 = "http://localhost:8080/Servicios/cliente/";

const Pedido = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [menus, setMenus] = useState([]);
;
    const [id_pedido, setId_pedido] = useState(sessionStorage.getItem("id_pedido"));
    const [id_menu, setId_menu] = useState("");
    const [valor, setValor] = useState("");
    const [valortotal, setValortotal] = useState(0);
    const [estado] = useState("iniciado");
    const [pedidos2, setPedidos2] = useState([]);
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [id_pedido_menu, setId_pedido_menu] = useState(0);
   
if (!sessionStorage.getItem("id_cliente") ) {
    navigate("/login");
}
if (sessionStorage.getItem("id_pedido")==="0" || !sessionStorage.getItem("id_pedido") ) {
    navigate("/nuevoPedido");
}
    useEffect(() => { 
        
        getMenus();
        getVisualizador();
        // console.log(sessionStorage.getItem("id_pedido"));
    }, []);

    const getVisualizador = async () => { 
        if (sessionStorage.getItem("id_cliente")==="0" || !sessionStorage.getItem("id_cliente") ) {
            navigate("/login");
        }
        try {
            const res = await axios({
                method: "GET",
                url: URI1 + "visualizarPedido/" + sessionStorage.getItem("id_pedido")
                
            });
     
            if (res.data.length === 0) {
                // console.log("sin datos");
                setPedidos2([]); 
              
            } else {
                setPedidos2(res.data);
                console.log("Datos recibidos:", res.data);

            }
        } catch (error) {
            if (error) { 
                console.error("sin datos"); 
                setPedidos2([]); 

            } else { 
                console.error("No tiene Acceso a esta Opciónes!", "Presiona el botón!", "error"); 
                setPedidos2([]); 
            }
        }
    };
    

   

    const guardar = async (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("id_pedido")==="0" || !sessionStorage.getItem("id_pedido") ) {
            navigate("/nuevoPedido");
        }
        const valorMenu = parseInt(e.target[0].value) * parseInt(e.target[3].value);
        const nuevoValorTotal = parseInt(valortotal) + parseInt(valorMenu);  // Calcula el nuevo valor total como número
        // console.log("ID del menú:", e.target[2].value);
        // console.log("Valor del menú:", valorMenu,valortotal);
        // console.log("Nuevo valor total:", nuevoValorTotal);
    
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
            // console.error('Error al agregar el menú al pedido:', error);
            swal("Error al agregar el menú al pedido", "Presiona el botón", "error"); 
        }
        getVisualizador();
    };
    

    const actualizarValorPedido = async (nuevoValorTotal) => {
        try { 
            const pedidoActualizado = { 
                id_pedido: sessionStorage.getItem('id_pedido'), 
                valor_pedido: nuevoValorTotal,
                estado: estado 
               
            };
    console.log(pedidoActualizado)
            // console.log("Actualizando pedido con:", pedidoActualizado);
            await axios.put(`${URI}`, pedidoActualizado);
            
            // console.log('Valor del pedido actualizado:', pedidoActualizado);
        } catch (error) { 
            // console.error('Error al actualizar el valor del pedido:', error);
            swal("Error al actualizar el valor del pedido", "Presiona el botón", "error"); 
        }
    };
    

    const getMenus = async () => {
        if (sessionStorage.getItem("id_cliente")==="0" || !sessionStorage.getItem("id_cliente") ) {
            navigate("/login");
        }
        try {
            const res = await axios({
                method: "GET",
                url: URI2 + "list"
            });
           
     
            if (res.data === null) {
                // console.log("sin datos");
                setPedidos2([]); 
              
            } else {
                setMenus(res.data);
                // console.log("Datos recibidos:", res.data);

            }

        } catch (error) {
            // console.log('Error al obtener los menús:, error);
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
        if (sessionStorage.getItem("id_pedido")==="0" || !sessionStorage.getItem("id_pedido") ) {
            navigate("/nuevoPedido");
        }
    //   const  id = e.target[0].value;
    const id = e.target[0].value; 
    const cantidad = e.target[1].value; 
    const valor = e.target[2].value; 
    const valorMenu = parseInt(valor) ; 
    const nuevoValorTotal = parseInt(valortotal) - parseInt(valorMenu); 
    e.preventDefault(); 
    // console.log(nuevoValorTotal);
    // console.log(valorMenu);
    // console.log(cantidad);
    // console.log(valor);
    try { 
        // setId_pedido_menu(id); 
        await axios.delete(`${URI1}${id}`); 
        await actualizarValorPedido(nuevoValorTotal);
        
         setValortotal(nuevoValorTotal); 
        
         swal("Menú eliminado del pedido con éxito", "", "success"); 
         getVisualizador(); 
         } catch (error) { 
         console.error('Error al cancelar el menú:', error); 
    swal("Error al cancelar el menú", "Presiona el botón", "error"); 
}};
const EliminarPedidoCompleto = async (e) => {
    //   const  id = e.target[0].value;
   
    e.preventDefault(); 
    // console.log(nuevoValorTotal);
    // console.log(valorMenu);
    // console.log(cantidad);
    // console.log(valor);
    try { 
        setId_pedido(sessionStorage.getItem("id_pedido")); 
        console.log(parseInt(sessionStorage.getItem("id_pedido")));
        console.log(parseInt(id_pedido));
        const response = await fetch(`${URI}${parseInt(id_pedido)}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }); if (!response.ok) { throw new Error('Error al cancelar el menú'); } 
        swal("eliminado con exito", "Presiona el botón", "success");
   
            navigate("/nuevoPedido");
 
         } catch (error) { 
           
                    swal("para elimiar pedido cancele los menus que ordeno", "entendido", "error"); 
              

                
        }
          
        
        

        getVisualizador();
        // setId_pedido_menu(0);
    };

    const salir = async (e) => {
        if (sessionStorage.getItem("id_pedido")==="0" || !sessionStorage.getItem("id_pedido") ) {
            navigate("/nuevoPedido");
        }
        e.preventDefault();
        try { 
            const pedidoActualizado2 = { 
                id_pedido: sessionStorage.getItem('id_pedido'), 
                valor_pedido: valortotal, 
                estado: "CERRADO"
            };
            await axios.put(`${URI}`, pedidoActualizado2);
            console.log('Valor del pedido actualizado:', pedidoActualizado2);
            sessionStorage.removeItem('id_pedido');
            console.log(sessionStorage.getItem('id_pedido'));
            if (sessionStorage.getItem("id_pedido")==="0" || !sessionStorage.getItem("id_pedido") ) {
                navigate("/nuevoPedido");
            }
        } catch (error) { 
            console.error('Error al actualizar el valor del pedido:', error);
            swal("Error al actualizar el valor del pedido", "Presiona el botón", "error"); 
        }
    
       
    };
    
    return (
        <div className="container-fluid" width="100%" height="40%">
            <div className="border-0 shadow-lg my-5">
                <div className="card-body p-0"

                style={{
                    display: 'flex',
                        justifyContent: 'spaceBetween',
                        flexDirection: 'rowReverse',
                        alignItems: 'flexStart',
                        flexWrap: 'nowrap'
                }
                }>
                    <div className="row">
                        <div className="col-lg-5 d-lg-block
                        "
                        style={{
                            width: 'auto'
                        }}>
                            <div className="p-5">
                                <div className="text-center">

                                    <h1 className="h4 text-gray-900 mb-4">Menús</h1>
                                </div>
                                <div className="form-group">
                                    <div className="form-group">
                                        <table className="table" style={{
                                            alignContent: 'center',
                                            padding: '15px',
                                         
                                            background: 'rgb(184 222 255)',
                                      
                                            display: 'inline-block',
                                            color: 'aqua',
                                            // width: '553px',
                                            fontSize: '20px',
                                            fontWeight: '700',
                                            textAlignLast: 'justify',
                                            boxShadow: 'rgb(11, 69, 14) 0px 4px 20px 10px'
                                        }}>
                                            <thead className="table-light">
                                                <tr 
                                                style={{

                                                }}>
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
                                                                    <a href="#">
                                                                        <span>{menu.nombre}</span>
                                                                        <span>
                                                                            <i className="fas fa-address-card" aria-hidden="true"></i>
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>{menu.precio}</td>
                                                        <td
                                                        style={{
                                                            width:'50px'
                                                        }}
                                                        >
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
                            <a href="#">
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
                <div style={{
    display: 'flex',
    justifyContent:'space-between'
}}
><button className="btn btn-warning"onClick={EliminarPedidoCompleto}>Cancelar</button>
    <button className="btn btn-success"onClick={salir}>TERMINADO</button></div>
            </div>
                </div>

            </div>
          
           
        </div>
    );
    


};


export default Pedido;
