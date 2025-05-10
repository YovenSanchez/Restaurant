package com.Restaurante.Servicios.Servlet;

import com.Restaurante.Servicios.Models.Menu;
import com.Restaurante.Servicios.Models.Pedido;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/pedidosServlet")
public class PedidosServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Cargar la lista del menú (en un caso real, esto vendría de una base de datos)
        List<Menu> menuList = new ArrayList<>();
        menuList.add(new Menu(1, "Pizza", "Deliciosa pizza de pepperoni", 12000, "Disponible"));
        menuList.add(new Menu(2, "Hamburguesa", "Jugosa hamburguesa con queso", 10000, "Disponible"));
        // Agrega más elementos según sea necesario

        // Establecer la lista del menú como un atributo de la solicitud
        request.setAttribute("menuList", menuList);

        // Redirigir a la página JSP del menú
        request.getRequestDispatcher("/pedidos.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Lógica para manejar la adición de elementos al pedido
        // Aquí podrías procesar los datos del formulario y agregar los elementos al pedido
        
        // Redirigir de nuevo a la página JSP del pedido
        request.getRequestDispatcher("/pedidos.jsp").forward(request, response);
    }
}
