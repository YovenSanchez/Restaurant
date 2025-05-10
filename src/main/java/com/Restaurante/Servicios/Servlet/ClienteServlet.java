package com.Restaurante.Servicios.Servlet;

import com.Restaurante.Servicios.Models.Cliente;
import com.Restaurante.Servicios.Service.ClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static java.lang.System.console;
import java.util.List;

@WebServlet("/cliente")
public class ClienteServlet extends HttpServlet {

    @Autowired
    private ClienteService clienteService;

    @Override
    public void init() {
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        switch (action) {
            case "create":
                agregarCliente(request, response);
                break;
            case "update":
                editarCliente(request, response);
                break;
            case "delete":
                eliminarCliente(request, response);
                break;
            default:
                listarClientes(request, response);
                break;
        }
    }

    private void agregarCliente(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nombre_cliente = request.getParameter("nombre_cliente");
        String numero_documento = request.getParameter("numero_documento");
        String telefono = request.getParameter("telefono");
        int edad = Integer.parseInt(request.getParameter("edad"));
        String correo_electronico = request.getParameter("correo_electronico");
        String direccion = request.getParameter("direccion");
System.out.println("Nombre: " + nombre_cliente); System.out.println("Número de Documento: " + numero_documento); System.out.println("Teléfono: " + telefono); System.out.println("Edad: " + edad); System.out.println("Correo Electrónico: " + correo_electronico); System.out.println("Dirección: " + direccion);
        Cliente cliente = new Cliente();
        cliente.setNombre_cliente(nombre_cliente);
        cliente.setNumero_documento(numero_documento);
        cliente.setTelefono(telefono);
        cliente.setEdad(edad);
        cliente.setCorreo_electronico(correo_electronico);
        cliente.setDireccion(direccion);
     
        clienteService.save(cliente);
        response.sendRedirect("cliente_exito.jsp");
    }

    private void editarCliente(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id_cliente"));
        Cliente cliente = clienteService.findById(id);

        if (cliente != null) {
            cliente.setNombre_cliente(request.getParameter("nombre_cliente"));
            cliente.setNumero_documento(request.getParameter("numero_documento"));
            cliente.setTelefono(request.getParameter("telefono"));
            cliente.setEdad(Integer.parseInt(request.getParameter("edad")));
            cliente.setCorreo_electronico(request.getParameter("correo_electronico"));
            cliente.setDireccion(request.getParameter("direccion"));

            clienteService.save(cliente);
            response.sendRedirect("cliente_exito.jsp");
        } else {
            response.sendRedirect("error.jsp");
        }
    }

    private void eliminarCliente(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id_cliente"));
        Cliente cliente = clienteService.findById(id);

        if (cliente != null) {
            clienteService.delete(id);
            response.sendRedirect("cliente_exito.jsp");
        } else {
            response.sendRedirect("error.jsp");
        }
    }

    private void listarClientes(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Cliente> clientes = clienteService.findByAll();
        request.setAttribute("clientes", clientes);
        request.getRequestDispatcher("listar_clientes.jsp").forward(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        listarClientes(request, response);
    }
}
