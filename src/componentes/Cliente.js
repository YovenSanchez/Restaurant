import swal from "sweetalert";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const URI3 = "http://localhost:8080/Servicios/cliente/";

const Cliente = () => {
    const [cliente, setCliente] = useState({
        nombre_cliente: "",
        numero_documento: "",
        telefono: "",
        edad: "",
        correo_electronico: "",
        direccion: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prevState => ({ 
            ...prevState, [name]: 
            (name === 'telefono' || name === 'edad') ? parseInt(value) : value 
        }));
    };
    const validar = async (cliente) => {
        try {
            console.log(cliente);
               const res = await axios({
                method: "GET",
                url: `${URI3}login?nombre_cliente=${cliente.nombre_cliente}&numero_documento=${cliente.numero_documento}`
            });
            const existingCliente = res.data;
            return existingCliente;

        } catch (error) {
            console.error('Error al guardar el cliente:', error);
            swal("Error al guardar el cliente", "Presiona el botón", "error");
            return null;
        }

            
            // const id_cliente = existingCliente.id_cliente;
    };
    const guardar = async (e) => {
        e.preventDefault();
        
        const existingCliente = await validar(cliente);
            if (!existingCliente) {
                console.log(cliente);
           
                await axios.post(URI3, cliente);
                swal("Registro exitoso!", "Cliente registrado correctamente", "success");
                // validar(existingCliente,id_cliente);
                const existingCliente = await validar(cliente);
                const id_cliente = existingCliente.id_cliente;
                sessionStorage.setItem("id_cliente", id_cliente);
                navigate('/nuevoPedido');
            } else {
                console.log(cliente);
                console.log(existingCliente);
                
                const id_cliente = existingCliente.id_cliente;
                
                // const id_cliente = existingCliente.id_cliente;
                sessionStorage.setItem("id_cliente", id_cliente);
                swal("Bienvenido " + existingCliente.nombre_cliente + "!", "Presiona el botón!", "success");
                Navigate('/nuevoPedido');
            }
  
    };

    return (
    //     <div class="container center"><h1>Regístrate</h1>
    // <form style="
    // align-content: center;
    // padding: 15px;
    // background: #258246e6;
    // display: inline-block;
    // color: aqua;
    // width: 553px;
    // font-size: 20px;
    // font-weight: 700;
    // text-align-last: justify;
    // box-shadow: 0 4px 20px 10px rgb(11 69 14);
// "><div class="mb-3"><label class="form-label">Nombre del cliente</label><input type="text" name="nombre_cliente" required="" class="form-control" value="Forcef"></div><div class="mb-3"><label class="form-label">Número de documento</label><input type="text" name="numero_documento" required="" class="form-control" value="123f"></div><div class="mb-3"><label class="form-label">Edad</label><input type="number" name="edad" required="" class="form-control" value="1212"></div><div class="mb-3"><label class="form-label">Teléfono</label><input type="number" name="telefono" required="" class="form-control" value="32547235961"></div><div class="mb-3"><label class="form-label">Dirección</label><input type="text" name="direccion" required="" class="form-control" value=""></div><div class="mb-3"><label class="form-label">Correo electrónico</label><input type="email" name="correo_electronico" required="" class="form-control" value=""></div><button type="submit" class="btn btn-primary">Login</button></form></div>
        <div className="container center">
            <h3>Regístrate</h3>
            <form onSubmit={guardar} style={{
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
                    <label className="form-label">Nombre del cliente</label>
                    <input
                           
                        value={cliente.nombre_cliente}
                        onChange={handleChange}
                        type="text"
                        name="nombre_cliente"
                        required
                        className="form-control"
                         style={{
                            fontWeight:'750',
                            fontSize:'20px',
                             backgroundColor:' #f3d2d2',
                             color: "black"
                        }}onFocus={(e) => { e.target.style.color = 'var(--input-focus-color)'; e.target.style.backgroundColor = 'var(--input-focus-bg)'; e.target.style.borderColor = 'var(--input-focus-border-color)'; e.target.style.outline = '0'; e.target.style.boxShadow = 'var(--input-focus-box-shadow)'; }} onBlur={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = '#f3d2d2'; e.target.style.borderColor = '#ccc'; e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'; }}
                          
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de documento</label>
                    <input
                           
                        onChange={handleChange}
                        type="text"
                        name="numero_documento"
                        required
                        className="form-control"
                         style={{
                            fontWeight:'750',
                            fontSize:'20px',
                             backgroundColor:' #f3d2d2',
                             color: "black"
                        }}onFocus={(e) => { e.target.style.color = 'var(--input-focus-color)'; e.target.style.backgroundColor = 'var(--input-focus-bg)'; e.target.style.borderColor = 'var(--input-focus-border-color)'; e.target.style.outline = '0'; e.target.style.boxShadow = 'var(--input-focus-box-shadow)'; }} onBlur={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = '#f3d2d2'; e.target.style.borderColor = '#ccc'; e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'; }}
                          
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Edad</label>
                    <input
                             style={{
                            fontWeight:'750',
                            fontSize:'20px',
                             backgroundColor:' #f3d2d2',
                             color: "black"
                        }}onFocus={(e) => { e.target.style.color = 'var(--input-focus-color)'; e.target.style.backgroundColor = 'var(--input-focus-bg)'; e.target.style.borderColor = 'var(--input-focus-border-color)'; e.target.style.outline = '0'; e.target.style.boxShadow = 'var(--input-focus-box-shadow)'; }} onBlur={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = '#f3d2d2'; e.target.style.borderColor = '#ccc'; e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'; }}
                          
                        value={cliente.edad}
                        onChange={handleChange}
                        type="number"
                        name="edad"
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                             style={{
                            fontWeight:'750',
                            fontSize:'20px',
                             backgroundColor:' #f3d2d2',
                             color: "black"
                        }}onFocus={(e) => { e.target.style.color = 'var(--input-focus-color)'; e.target.style.backgroundColor = 'var(--input-focus-bg)'; e.target.style.borderColor = 'var(--input-focus-border-color)'; e.target.style.outline = '0'; e.target.style.boxShadow = 'var(--input-focus-box-shadow)'; }} onBlur={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = '#f3d2d2'; e.target.style.borderColor = '#ccc'; e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'; }}
                          
                        value={cliente.telefono}
                        onChange={handleChange}
                        type="number"
                        name="telefono"
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                             style={{
                            fontWeight:'750',
                            fontSize:'20px',
                             backgroundColor:' #f3d2d2',
                             color: "black"
                        }}onFocus={(e) => { e.target.style.color = 'var(--input-focus-color)'; e.target.style.backgroundColor = 'var(--input-focus-bg)'; e.target.style.borderColor = 'var(--input-focus-border-color)'; e.target.style.outline = '0'; e.target.style.boxShadow = 'var(--input-focus-box-shadow)'; }} onBlur={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = '#f3d2d2'; e.target.style.borderColor = '#ccc'; e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'; }}
                          
                        value={cliente.direccion}
                        onChange={handleChange}
                        type="text"
                        name="direccion"
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                             style={{
                            fontWeight:'750',
                            fontSize:'20px',
                             backgroundColor:' #f3d2d2',
                            color: "black"}
                             }
                             onFocus={(e) => { e.target.style.color = 'var(--input-focus-color)'; e.target.style.backgroundColor = 'var(--input-focus-bg)'; e.target.style.borderColor = 'var(--input-focus-border-color)'; e.target.style.outline = '0'; e.target.style.boxShadow = 'var(--input-focus-box-shadow)'; }}
                             onBlur={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = '#f3d2d2'; e.target.style.borderColor = '#ccc'; e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'; }}
                             value={cliente.correo_electronico}
                        onChange={handleChange}
                        type="email"
                        name="correo_electronico"
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default Cliente;

