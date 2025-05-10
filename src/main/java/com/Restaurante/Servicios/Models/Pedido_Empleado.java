
package com.Restaurante.Servicios.Models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Table
@Entity(name="Pedido_Empleado")
public class Pedido_Empleado implements Serializable {
     @Id
    @Column(name="id")
    private int id_pedido_empleado;
@ManyToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;
@ManyToOne
    @JoinColumn(name = "id_Empleado")
    private Empleado empleado;
    @Column(name="Fecha")
        private String fecha;

    public Pedido_Empleado() {
    }

    public Pedido_Empleado(int id_pedido_empleado, Pedido pedido, Empleado empleado, String fecha) {
        this.id_pedido_empleado = id_pedido_empleado;
        this.pedido = pedido;
        this.empleado = empleado;
        this.fecha = fecha;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }



    public int getId_pedido_empleado() {
        return id_pedido_empleado;
    }

    public void setId_pedido_empleado(int id_pedido_empleado) {
        this.id_pedido_empleado = id_pedido_empleado;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }



}
