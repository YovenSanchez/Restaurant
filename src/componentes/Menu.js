import { Component } from "react"








const Menu = () => {

    return (


        <div id="wrapper">
                <ul className="navbar-nav bg-gradient-green-light sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Panel restaurante <sup>2</sup></div>
            </a>

     
            <hr className="sidebar-divider my-0"/>

       
            <li className="nav-item active">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Panel</span></a>
            </li>


            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Páginas</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">PANTALLAS DE INICIO DE SESIÓN:</h6>
                        <a className="collapse-item" href="login">Acesso</a>
                        <a className="collapse-item" href="/cliente">Registro</a>
                        <a className="collapse-item" href="/nuevo_pedido">Has Olvidado tu contraseña</a>
                        <a className="collapse-item" href="/MennusProductos">Ver Menus y Productos</a>
                        <div className="collapse-divider"> Operaciones</div>
                        <h6 className="collapse-header">opreciones del cliente</h6>
                        <a className="collapse-item" href="/Pedido">Solicitar Pedidos</a>
                        <a className="collapse-item" href="/Empleados">Conoce los Empleados</a>
                        <a className="collapse-item" href="/ClientePerfil">Crear cuenta de perfil de Cliente</a>
                        <a className="collapse-item" href="/Pedidos">Tus Pedidos</a>
                    </div>
                </div>
            </li>


            <li className="nav-item">
                <a className="nav-link" href="charts.html">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Gráficos</span></a>
            </li>


            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Mesas</span></a>
            </li>

          
            <hr className="sidebar-divider d-none d-md-block"/>


            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

    
            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
                <p className="text-center mb-2"><strong>SB Admin Pro</strong>  está repleto de características premium, componentes y más!</p>
                <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Actualízate a Pro!</a>
            </div>
            </ul>
  </div>

    );
};
export default Menu