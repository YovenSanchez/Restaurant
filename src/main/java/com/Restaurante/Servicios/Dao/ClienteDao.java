package com.Restaurante.Servicios.Dao;

import com.Restaurante.Servicios.Models.Cliente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
////


public interface ClienteDao extends CrudRepository <Cliente, Integer>{
    // Operación de Login
     @Transactional(readOnly = true)
    @Query(value = "select * from cliente where Nombre=:nombre_cliente and Numero_documento=:numero_documento", nativeQuery = true)
    public Cliente login(@Param("nombre_cliente") String nombre_cliente, @Param("numero_documento") String numero_documento);
  }