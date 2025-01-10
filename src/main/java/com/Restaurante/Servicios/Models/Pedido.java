
package com.Restaurante.Servicios.Models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


   
@Table
@Entity(name="pedido")
public class Pedido implements Serializable {
     @Id
    @Column(name="id")
    private int id_pedido;
         @Column(name="Estado")
    private String estado;
    @Column(name="Valor")
    private String valor_pedido;
    @Column(name="Fecha")
    private String fecha;

    @Column(name="Direccion")
    private String direccion;
@ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    public Pedido() {
    }

    public Pedido(int id_pedido, String estado, String valor_pedido, String fecha, String direccion, Cliente cliente) {
        this.id_pedido = id_pedido;
        this.estado = estado;
        this.valor_pedido = valor_pedido;
        this.fecha = fecha;
        this.direccion = direccion;
        this.cliente = cliente;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

  

    public int getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(int id_pedido) {
        this.id_pedido = id_pedido;
    }

    public String getValor_pedido() {
        return valor_pedido;
    }

    public void setValor_pedido(String valor_pedido) {
        this.valor_pedido = valor_pedido;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }


    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

}
