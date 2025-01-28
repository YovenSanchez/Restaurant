
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URI = "http://localhost:8080/Servicios/menu_producto/";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    

    useEffect(() => {
        listarProductos();
    }, []);

    const listarProductos = async () => {
        try {
            const res = await axios.get(URI + "list");
            setProductos(res.data);
            console.log(res.data);
        } catch (error) {
            console.log('Error al obtener los productos:', error);
        }
    };

   

    return (
        <div className="container">
            {/* <h1>Gestión de Productos</h1>
            <form onSubmit={productoId ? modificarProducto : agregarProducto}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Cescripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">
                    {productoId ? "Modificar" : "Agregar"}
                </button>
            </form> */}
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>Productos</th>
                        <th>Menu</th>
                        <th>Valor</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody margin-bottom="30" className="tbody-dark" border-color="black">
                    {productos.map((producto) => (
                        <tr key={producto.id_menu_producto}>
                            <td>{producto.producto.nombre}</td>
                            <td>{producto.menu.nombre}</td>
                            <td>{producto.producto.precio}</td>
                            <td>{producto.producto.descripcion}</td>
                            <td>
                                {/* <button
                                    className="btn btn-warning"
                                    onClick={() => seleccionarProducto(producto.producto)}
                                >
                                    Modificar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => eliminarProducto(producto.producto.id_producto)}
                                >
                                    Eliminar
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Productos;
