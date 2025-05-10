
package com.Restaurante.Servicios.Models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Table
@Entity(name="cliente")
public class Cliente implements Serializable {
     @Id
    @Column(name="id")
    private int id_cliente;
    @Column(name="Nombre")
    private String nombre_cliente;
    @Column(name="Numero_documento")
    private String numero_documento;
    
    @Column(name="Telefono")
    private String telefono;
    @Column(name="Edad")
    private int edad;
    @Column(name="Correo_electronico")
    private String correo_electronico;
    @Column(name="Direccion")
    private String direccion;


    public Cliente() {
    }

    public Cliente(Integer id_cliente, String nombre_cliente, String numero_documento, String telefono, int edad, String correo_electronico, String direccion) {
        this.id_cliente = id_cliente;
        this.nombre_cliente = nombre_cliente;
        this.numero_documento = numero_documento;
        this.telefono = telefono;
        this.edad = edad;
        this.correo_electronico = correo_electronico;
        this.direccion = direccion;
    }

    public Integer getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(int id_cliente) {
        this.id_cliente = id_cliente;
    }

    public String getNombre_cliente() {
        return nombre_cliente;
    }

    public void setNombre_cliente(String nombre_cliente) {
        this.nombre_cliente = nombre_cliente;
    }

    public String getNumero_documento() {
        return numero_documento;
    }

    public void setNumero_documento(String numero_documento) {
        this.numero_documento = numero_documento;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public String getCorreo_electronico() {
        return correo_electronico;
    }

    public void setCorreo_electronico(String correo_electronico) {
        this.correo_electronico = correo_electronico;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}