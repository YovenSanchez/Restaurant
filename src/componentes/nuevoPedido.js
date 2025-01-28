import swal from "sweetalert";
import axios from "axios";
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

const URI3 = "http://localhost:8080/Servicios/pedido/";
const URI = "http://localhost:8080/Servicios/cliente/";
const NuevoPedido = () => { 
  const navigate = useNavigate();
  const [estado] = useState("Iniciado");   
  const [fecha, setFecha] = useState("");
  // const [id_pedido, setId_pedido] = useState("");
  const [valor_pedido] = useState(0);   
  const [direccion, setDireccion] = useState("");
  const [id_cliente] = useState(sessionStorage.getItem('id_cliente'));

    useEffect(() => { 
        fetchCliente();
        
        // console.log(sessionStorage.getItem("id_pedido"));
    }, []);

const fetchCliente = async () => { 
  try { 
      const response = await axios({
          method: "GET",
          url: URI + "list/" + sessionStorage.getItem("id_cliente")
      });
      setDireccion(response.data.direccion); 
  // console.log(response.data)
  } catch (error) { 
      // console.error('Error obteniendo los datos del cliente:', error); 
  } 
}; 
  const registrarPedido = async (pedido) => {
    try {
     await axios.post(URI3, pedido);
      // console.log('Pedido insertado:', response.data);
      // setId_pedido(response.data.id_pedido);
      // sessionStorage.setItem("id_pedido", response.data.id_pedido);
      // return response.data.id_pedido;
    } catch (error) {
      console.error('Error al insertar el Pedido:', error);
      swal("Error al insertar el Pedido", "Presiona el botón", "error");
    }
    try {
      const res2 = await axios.get(`${URI3}Estado?estado=${estado}&id_cliente=${id_cliente}`);
      // console.log('Respuesta del servidor:', res2.data);
      if (res2.data) {
        // console.log('Pedido existente:', res2.data);
        // setId_pedido(res2.data.id_pedido);
        sessionStorage.setItem("id_pedido", res2.data.id_pedido);
        swal('Pedido registrado encontrado', `ID del Pedido: ${res2.data.id_pedido}`, "info");
        navigate('/pedido'); 
      } else {
        // const nuevoIdPedido = await registrarPedido(pedido);
        // console.log('Nuevo pedido registrado con ID:', nuevoIdPedido);
        // swal('Nuevo pedido registrado', `ID del Pedido: ${nuevoIdPedido}`, "success");
        // navigate('/pedido'); 
      }
    } catch (error) {
      console.error('Error al verificar el estado del pedido:', error);
      swal("Operación NO realizada", "Revise los detalles del error en la consola", "error");
    }
  };

  const guardar = async (e) => { 
    e.preventDefault();
    // console.log(sessionStorage.getItem('id_cliente'));
    const pedido = { valor_pedido, estado, fecha, direccion, cliente: { id_cliente: sessionStorage.getItem('id_cliente') } }; 
    // console.log(pedido); 
    try {
      const res = await axios.get(`${URI3}Estado/?estado=${estado}&id_cliente=${id_cliente}`);
      // console.log('Respuesta del servidor:', res.data);
      if (res.data) {
        console.log('Pedido existente:', res.data);
        // setId_pedido(res.data.id_pedido);
        sessionStorage.setItem("id_pedido", res.data.id_pedido);
        swal('Pedido existente encontrado', `ID del Pedido: ${res.data.id_pedido}`, "info");
        navigate('/pedido'); 
      } else {
        const nuevoIdPedido = await registrarPedido(pedido);
        // console.log('Nuevo pedido registrado con ID:', nuevoIdPedido);
        swal('Nuevo pedido registrado', `ID del Pedido: ${nuevoIdPedido}`, "success");
        navigate('/pedido'); 
      }
    } catch (error) {
      console.error('Error al verificar el estado del pedido:', error);
      swal("Operación NO realizada", "Revise los detalles del error en la consola", "error");
    }

  };

  return (
    <div className="container center">
      <h3>Registrar Pedido</h3>
      <form onSubmit={guardar}
      style={{
        marginTop: '20px',
        alignContent: 'center',
        padding: '15px',
        background: '#258246e6',
        display: 'inline-block',
        color: 'aqua',
        width: '553px',
        fontSize: '20px',
        fontWeight: '700',
        textAlignLast: 'justify',
        boxShadow: '0 4px 20px 10px rgb(11, 69, 14)'
    }}>
      
        <div className="mb-3">
         
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            onChange={(e) => setDireccion(e.target.value)}
            type="text"
            name="direccion"
            required
            placeholder={direccion+"   tu direccion predeterminada"}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            onChange={(e) => setFecha(e.target.value)}
            type="date"
            name="fecha"
            required
          
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar Pedido
        </button>
      </form>
    </div> 
  );  
};

export default NuevoPedido;
