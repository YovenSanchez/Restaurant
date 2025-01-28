import swal from "sweetalert";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URI = "http://tuapi.com/menu/";

const Menus = () => {
    const [menus, setMenus] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [disponibilidad, setDisponibilidad] = useState(false);
    const [menuId, setMenuId] = useState(null);

    useEffect(() => {
        listmenus();
    }, []);

    const listmenus = async () => {
        try {
            const res = await axios.get(URI + "list");
            setMenus(res.data);
        } catch (error) {
            console.error('Error al cancelar el menú:', error); 
               swal("Error al listar los menús el botón ","Presiona el botón", "error"); 
        }
    };

    const deleteMenu = async (id) => {
        try {
            await axios.delete(`${URI}${id}`);
            listmenus();
        } catch (error) {
            console.log('Error al eliminar el menú:', error);
            swal("Error al cancelar el menú ", "Presiona el botón", "error"); 
        }
    };

    const modificarMenu = async (e) => {
        e.preventDefault();
        const menu = {
            id_menu: menuId,
            nombre,
            descripcion,
            precio,
            disponibilidad
        };
        try {
            await axios.put(URI, menu);
            listmenus();
            setMenuId(null);
            setNombre("");
            setDescripcion("");
            setPrecio(0);
            setDisponibilidad(false);
        } catch (error) {
            console.log('Error al modificar el menú:', error);
        }
    };

    const agregarMenu = async (e) => {
        e.preventDefault();
        const nuevoMenu = { nombre, descripcion, precio, disponibilidad };
        try {
            await axios.post(URI, nuevoMenu);
            listmenus();
            setNombre("");
            setDescripcion("");
            setPrecio(0);
            setDisponibilidad(false);
        } catch (error) {
            console.log('Error al agregar el menú:', error);
        }
    };

    const seleccionarMenu = (menu) => {
        setMenuId(menu.id_menu);
        setNombre(menu.nombre);
        setDescripcion(menu.descripcion);
        setPrecio(menu.precio);
        setDisponibilidad(menu.disponibilidad);
    };

    return (
        <div className="container">
            <h1>Gestión de Menús</h1>
            <form onSubmit={menuId ? modificarMenu : agregarMenu}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descripción"
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
                <input
                    type="checkbox"
                    checked={disponibilidad}
                    onChange={(e) => setDisponibilidad(e.target.checked)}
                /> Disponibilidad
                <button type="submit" className="btn btn-primary">
                    {menuId ? "Modificar" : "Agregar"}
                </button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Disponibilidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu) => (
                        <tr key={menu.id_menu}>
                            <td>{menu.nombre}</td>
                            <td>{menu.descripcion}</td>
                            <td>{menu.precio}</td>
                            <td>{menu.disponibilidad ? "Sí" : "No"}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => seleccionarMenu(menu)}
                                >
                                    Modificar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteMenu(menu.id_menu)}
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

export default Menus;
