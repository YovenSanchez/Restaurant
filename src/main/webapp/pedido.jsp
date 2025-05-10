<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Realizar Pedido</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2 class="text-center">Realizar Pedido</h2>
            <form action="/pedido" method="post" class="border p-4 bg-light shadow">
                <input type="hidden" name="action" value="create">
                <div class="form-group">
                    <label for="estado">Estado:</label>
                    <input type="text" class="form-control" id="estado" name="estado" required>
                </div>
                <div class="form-group">
                    <label for="valor_pedido">Valor del Pedido:</label>
                    <input type="text" class="form-control" id="valor_pedido" name="valor_pedido" required>
                </div>
                <div class="form-group">
                    <label for="fecha">Fecha:</label>
                    <input type="date" class="form-control" id="fecha" name="fecha" required>
                </div>
                <div class="form-group">
                    <label for="direccion">Dirección:</label>
                    <input type="text" class="form-control" id="direccion" name="direccion" required>
                </div>
                <div class="form-group">
                    <label for="id_cliente">ID Cliente:</label>
                    <input type="number" class="form-control" id="id_cliente" name="id_cliente" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Realizar Pedido</button>
            </form>
        </div>
    </div>
</div>

<!-- Bootstrap JS, Popper.js, and