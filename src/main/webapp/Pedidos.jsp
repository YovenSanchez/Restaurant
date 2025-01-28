<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Menú del Restaurante</title>
</head>
<body>
    <h1>Menú del Restaurante</h1>

    <form action="pedidoServlet" method="post">
        <c:forEach var="menuItem" items="${menuList}">
            <div>
                <h2>${menuItem.nombre}</h2>
                <p>${menuItem.descripcion}</p>
                <p>Precio: $${menuItem.precio}</p>
                <p>Disponibilidad: ${menuItem.disponibilidad}</p>
                <label for="cantidad_${menuItem.id_menu}">Cantidad:</label>
                <input type="number" id="cantidad_${menuItem.id_menu}" name="cantidad_${menuItem.id_menu}" min="0" /><br/><br/>
            </div>
        </c:forEach>
        <input type="submit" value="Agregar al Pedido"/>
    </form>
</body>
</html>
