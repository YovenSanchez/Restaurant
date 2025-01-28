package com.Restaurante.Servicios.Dao;

import com.Restaurante.Servicios.Models.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
////


public interface UsuarioDao extends CrudRepository <Usuario, Integer>{
    // Operación de Login
     @Transactional(readOnly = true)
    @Query(value = "SELECT * FROM usuario where Usuario=:usuario and Contrasena=:contrasena", nativeQuery = true)
    public Usuario login(@Param("usuario") String usuario, @Param("contrasena") String contrasena);
  }