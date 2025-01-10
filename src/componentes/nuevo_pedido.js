import swal from "sweetalert";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const URI3 = "http://localhost:8080/Servicios/pedido/";

const Nuevo_pedido = () => { 
  const navigate = useNavigate();
  const [estado, setEstado] = useState("Iniciado");   
  const [fecha, setFecha] = useState("");
  const [id_pedido, setId_pedido] = useState("");
  const [valor_pedido, setValor_pedido] = useState(0);   
  const [direccion, setDireccion] = useState("");
  const [id_cliente, setCliente] = useState(sessionStorage.getItem('id_cliente'));
  const [pedido, setPedido] = useState([]);
  const [pedido2, setPedido2] = useState([]);
console.log(sessionStorage.getItem('id_cliente'));
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
      console.log('Respuesta del servidor:', res2.data);
      if (res2.data) {
        // console.log('Pedido existente:', res2.data);
        setId_pedido(res2.data.id_pedido);
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
    console.log(sessionStorage.getItem('id_cliente'));
    const pedido = { valor_pedido, estado, fecha, direccion, cliente: { id_cliente: sessionStorage.getItem('id_cliente') } }; 
    console.log(pedido); 
    try {
      const res = await axios.get(`${URI3}Estado?estado=${estado}&id_cliente=${id_cliente}`);
      console.log('Respuesta del servidor:', res.data);
      if (res.data) {
        console.log('Pedido existente:', res.data);
        setId_pedido(res.data.id_pedido);
        sessionStorage.setItem("id_pedido", res.data.id_pedido);
        swal('Pedido existente encontrado', `ID del Pedido: ${res.data.id_pedido}`, "info");
        navigate('/pedido'); 
      } else {
        const nuevoIdPedido = await registrarPedido(pedido);
        console.log('Nuevo pedido registrado con ID:', nuevoIdPedido);
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
      <form onSubmit={guardar}>
        <div className="mb-3">
          <label className="form-label">ID del Cliente</label>
          <label className="form-label">{sessionStorage.getItem('id_cliente')}</label>
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            onChange={(e) => setDireccion(e.target.value)}
            type="text"
            name="direccion"
            required
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

export default Nuevo_pedido;
