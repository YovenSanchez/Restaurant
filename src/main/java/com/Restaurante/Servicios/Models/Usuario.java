package com.Restaurante.Servicios.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Table
@Entity(name="usuario")
public class Usuario implements Serializable {
     @Id
    @Column(name="id")
    private int id_cliente;
    @Column(name="Usuario")
    private String usuario;
    @Column(name="Contrasena")
    private String contrasena;
    
 


    public Usuario() {
    }
 public Usuario(Integer id_cliente, String usuario, String contrasena) {
        this.id_cliente = id_cliente;
        this.usuario = usuario;
        this.contrasena = contrasena;
       
    }
      public Integer getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(int id_cliente) {
        this.id_cliente = id_cliente;
    }

    public String getUusuario() {
        return usuario;
    }

    public void setUusuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

}