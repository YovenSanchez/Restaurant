
package com.Restaurante.Servicios.Servlet;
import com.Restaurante.Servicios.Models.Cliente;
import com.Restaurante.Servicios.Models.Pedido;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/pedidoServlet")
public class PedidoServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Obtener los parámetros del formulario
        String idPedido = request.getParameter("id_pedido");
        String fecha = request.getParameter("fecha");
        String direccion = request.getParameter("direccion");
        String nombreCliente = request.getParameter("cliente");

        // Crear un objeto Cliente (en un caso real, buscarías esto en la base de datos)
        Cliente cliente = new Cliente();
        cliente.setNombre_cliente(nombreCliente);

        // Crear un objeto Pedido y configurar sus valores
        Pedido pedido = new Pedido();
        pedido.setId_pedido(Integer.parseInt(idPedido));
        pedido.setEstado("iniciado"); // Estado fijado como "iniciado"
        pedido.setValor_pedido("0"); // Valor fijado como cero
        pedido.setFecha(fecha);
        pedido.setDireccion(direccion);
        pedido.setCliente(cliente);

        // Aquí podrías agregar lógica para guardar el pedido en una base de datos

        // Establecer el pedido como un atributo de la solicitud
        request.setAttribute("pedido", pedido);

        // Redirigir de nuevo a la página JSP para mostrar los cambios
        request.getRequestDispatcher("/pedido.jsp").forward(request, response);
    }
}
