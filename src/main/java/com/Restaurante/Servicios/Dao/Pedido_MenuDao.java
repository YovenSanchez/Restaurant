package com.Restaurante.Servicios.Dao;

import com.Restaurante.Servicios.Models.Pedido_Menu;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface Pedido_MenuDao extends CrudRepository <Pedido_Menu, Integer>{

  

@Transactional(readOnly = true) 
@Query(value = "SELECT * FROM pedido_menu WHERE id_pedido = :id_pedido ", nativeQuery = true) 
List<Pedido_Menu> consultarPedido(@Param("id_pedido") Integer id_pedido);

    @Modifying @Transactional 
    @Query(value = "DELETE FROM Pedido_Menu WHERE id_pedido = :id_pedido AND id_Menu = :id_menu", nativeQuery = true) 
            void eliminarPedido_Menu(@Param("id_pedido") Integer id_pedido, @Param("id_menu") Integer id_menu);
         
         }
    // Operación Depósito
  
