package com.Restaurante.Servicios.Dao;

import com.Restaurante.Servicios.Models.Pedido;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
////


public interface PedidoDao extends CrudRepository <Pedido, Integer>{
 @Transactional(readOnly = true)
    @Query(value = "select * from pedido where id_cliente=:id_cliente and Estado=:estado", nativeQuery = true)
    public Pedido estado(@Param("id_cliente") int id_cliente, @Param("estado") String estado);

  }