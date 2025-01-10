import swal from "sweetalert";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const guardar = async (e) => {
        e.preventDefault();
        try {
            console.log(cliente);
               const res = await axios({
                method: "GET",
                url: `${URI3}login?nombre_cliente=${cliente.nombre_cliente}&numero_documento=${cliente.numero_documento}`
            });
            

            const existingCliente = res.data;
            if (!existingCliente) {
                console.log(cliente);
                await axios.post(URI3, cliente);
                swal("Registro exitoso!", "Cliente registrado correctamente", "success");
            } else {
                const id_cliente = existingCliente.id_cliente;
                sessionStorage.setItem("id_cliente", id_cliente);
                swal("Bienvenido " + existingCliente.nombre_cliente + "!", "Presiona el botón!", "success");
            }
        } catch (error) {
            console.error('Error al guardar el cliente:', error);
            swal("Error al guardar el cliente", "Presiona el botón", "error");
        }
    };

    return (
        <div className="container center">
            <h3>Regístrate</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <label className="form-label">Nombre del cliente</label>
                    <input
                        value={cliente.nombre_cliente}
                        onChange={handleChange}
                        type="text"
                        name="nombre_cliente"
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de documento</label>
                    <input
                        value={cliente.numero_documento}
                        onChange={handleChange}
                        type="text"
                        name="numero_documento"
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Edad</label>
                    <input
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
                        value={cliente.correo_electronico}
                        onChange={handleChange}
                        type="email"
                        name="correo_electronico"
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Cliente;

