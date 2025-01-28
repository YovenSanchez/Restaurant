
import swal from "sweetalert";
import axios from "axios";
import {useState}  from "react";
import { useNavigate } from "react-router-dom";
const Url = "http://localhost:8080/Servicios/cliente/"
const Login = () => {
const navigate = useNavigate();

const [numero_documento, setNumero_documento] = useState("");
const [nombre_cliente, setNombre_cliente] = useState("");
const guardar = async (e) => {
    e.preventDefault();
    
    try {
        // console.log(nombre_cliente);
           const res = await axios({
            method: "GET",
            url: `${Url}login?nombre_cliente=${nombre_cliente}&numero_documento=${numero_documento}`
        });
        // swal("Bienvenido " + nombre_cliente + "!", "Presiona el botón!", "success");
    
         
        const id_cliente = res.data.id_cliente;
                console.log(res.data);
                if(res.data.id_cliente!== 'undefined'){
                    sessionStorage.setItem("id_cliente", id_cliente);
                    swal("Bienvenido " + nombre_cliente +id_cliente , "Presiona el botón!", "success");
                    navigate('/nuevo_pedido')
                }else{
                    swal("no encontrado " + nombre_cliente +"!", "Presiona el botón!", "success");
                    
                }
        // const id_cliente = existingCliente.id_cliente;
       
    
    } catch (error) {
        console.error('Error al encontrar el cliente:', error);
        swal("Error al encontrar el ", "Presiona el botón", "error");
      
    
}};
return (
 
  <div id="content center"
  style={{
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap'
    // justifyContent: 'flex-end'
}}
    className="container-fluid"
    >

  <div className="row justify-content-center">

      <div className="col-xl-12 col-lg-12 col-md-10">

          <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
              
                  <div className="row">
                    
                      <div className="col-lg-12">
                          <div className="p-5">
                              <div className="text-center">
                                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                              </div>
                              <form className="user"onSubmit={guardar}>
                                  <div className="form-group">
                                      <input type="text" className="form-control form-control-user"
                                      onChange={(e) => setNombre_cliente(e.target.value)} required onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio')} onInput={e => e.target.setCustomValidity('')}

                                          id="" aria-describedby=""
                                          placeholder="Enter user..."/>
                                  </div>
                                  <div className="form-group">
                                      <input type="password" className="form-control form-control-user"id="exampleInputPassword" placeholder="Password"
                                      onChange={(e) => setNumero_documento(e.target.value)} required onInvalid={(e) => e.target.setCustomValidity('El campo cantidad es obligatorio')} onInput={e => e.target.setCustomValidity('')}/>                                 
                                  </div>
                                  <div className="form-group">
                                      <div className="custom-control custom-checkbox small">
                                         
                                          <button type="submit" className="btn btn-primary">
                                             Login
                                          </button>
                                         
                                      </div>
                                  </div>
                                  
                                  <a href="index.html" className="btn btn-google btn-user btn-block">
                                      <i className="fab fa-google fa-fw"></i> Login with Google
                                  </a>
                                  <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                      <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                  </a>
                                 
                              </form>
                              
                             
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

  </div>
    </div>

);
};
export default Login;