
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URI = "http://Servicios/producto/";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [productoId, setProductoId] = useState(null);

    useEffect(() => {
        listarProductos();
    }, []);

    const listarProductos = async () => {
        try {
            const res = await axios.get(URI + "list");
            setProductos(res.data);
        } catch (error) {
            console.log('Error al obtener los productos:', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await axios.delete(`${URI}${id}`);
            listarProductos();
        } catch (error) {
            console.log('Error al eliminar el producto:', error);
        }
    };

    const modificarProducto = async (e) => {
        e.preventDefault();
        const producto = {
            id_producto: productoId,
            nombre,
            cantidad,
            precio
        };
        try {
            await axios.put(URI, producto);
            listarProductos();
            setProductoId(null);
            setNombre("");
            setCantidad(0);
            setPrecio(0);
        } catch (error) {
            console.log('Error al modificar el producto:', error);
        }
    };

    const agregarProducto = async (e) => {
        e.preventDefault();
        const nuevoProducto = { nombre, cantidad, precio };
        try {
            await axios.post(URI, nuevoProducto);
            listarProductos();
            setNombre("");
            setCantidad(0);
            setPrecio(0);
        } catch (error) {
            console.log('Error al agregar el producto:', error);
        }
    };

    const seleccionarProducto = (producto) => {
        setProductoId(producto.id_producto);
        setNombre(producto.nombre);
        setCantidad(producto.cantidad);
        setPrecio(producto.precio);
    };

    return (
        <div className="container">
            <h1>Gestión de Productos</h1>
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
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
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
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id_producto}>
                            <td>{producto.nombre}</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.precio}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => seleccionarProducto(producto)}
                                >
                                    Modificar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => eliminarProducto(producto.id_producto)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Productos;
