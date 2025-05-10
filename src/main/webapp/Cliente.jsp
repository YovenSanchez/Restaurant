<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Cliente</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <h2 class="text-center">Agregar Cliente</h2>
    <form action="/Servicios/cliente" method="post" class="border p-4 bg-light shadow">
        <input type="hidden" name="action" value="create">
        <div class="form-group">
            <label for="nombre_cliente">Nombre:</label>
            <input type="text" class="form-control" id="nombre_cliente" name="nombre_cliente" required>
        </div>
        <div class="form-group">
            <label for="numero_documento">Número de Documento:</label>
            <input type="text" class="form-control" id="numero_documento" name="numero_documento" required>
        </div>
        <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input type="text" class="form-control" id="telefono" name="telefono" required>
        </div>
        <div class="form-group">
            <label for="edad">Edad:</label>
            <input type="number" class="form-control" id="edad" name="edad" required>
        </div>
        <div class="form-group">
            <label for="correo_electronico">Correo Electrónico:</label>
            <input type="email" class="form-control" id="correo_electronico" name="correo_electronico" required>
        </div>
        <div class="form-group">
            <label for="direccion">Dirección:</label>
            <input type="text" class="form-control" id="direccion" name="direccion" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Agregar Cliente</button>
    </form>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
