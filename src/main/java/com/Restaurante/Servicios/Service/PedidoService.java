package com.Restaurante.Servicios.Service;


import com.Restaurante.Servicios.Models.Pedido;
import java.util.List;

public interface PedidoService {
    public Pedido save(Pedido pedido);
    public void delete(int id);
    public Pedido findById(int id);
    public List<Pedido> findByAll();
    public Pedido estado(int id_cliente,String Estado);
      public List<Pedido> consultarPedidos(int id_cliente);
}