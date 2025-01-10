
import swal from "sweetalert";
import axios from "axios";
import {useState}  from "react";
import { useNavigate } from "react-router-dom";
const Url = "http://localhost:8080/Servicios/cliente/"
const Login = () => {
const Navigate = useNavigate();
const [clientes, setClientes] = useState([])
const [id_cliente, setId_cliente] = useState("");
const [clave_cliente, setClave_cliente] = useState("");
const guardar = async (e) => {
    e.preventDefault();
try{
const res = await axios({
method : "GET",
url : URL+"login?usuario"+id_cliente+"&clave="+clave_cliente
});
setClientes(res.data)
if (res.data.id_cliente==null) {
swal("Cliente No Autorizado!", "presiona el botón!", "error");
Navigate("/");
}else{
    sessionStorage.setItem("usuario",id_cliente);
    sessionStorage.getItem("clave",clave_cliente);
    swal("Bienvenido"+res.data.nombre_cliente+"1", "Presiona el botón", "success");
}
}
catch (error){
swal("Operación NO realizado")
}
};
return (
  <div id="content-wrapper" className="d-flex flex-column"width="100%">
  <div id="content">
  <div className="container-fluid">

  <div className="row justify-content-center">

      <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
              
                  <div className="row">
                    
                      <div className="col-lg-6">
                          <div className="p-5">
                              <div className="text-center">
                                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                              </div>
                              <form className="user">
                                  <div className="form-group">
                                      <input type="email" className="form-control form-control-user"
                                          id="exampleInputEmail" aria-describedby="emailHelp"
                                          placeholder="Enter Email Address..."/>
                                  </div>
                                  <div className="form-group">
                                      <input type="password" className="form-control form-control-user"id="exampleInputPassword" placeholder="Password"/>
                                  </div>
                                  <div className="form-group">
                                      <div className="custom-control custom-checkbox small">
                                          <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                          <label className="custom-control-label" for="customCheck">Remember
                                              Me</label>
                                      </div>
                                  </div>
                                  <a href="index.html" className="btn btn-primary btn-user btn-block">
                                      Login
                                  </a>
                                
                                  <a href="index.html" className="btn btn-google btn-user btn-block">
                                      <i className="fab fa-google fa-fw"></i> Login with Google
                                  </a>
                                  <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                      <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                  </a>
                              </form>
                              
                              <div className="text-center">
                                  <a className="small" href="forgot-password.html">Forgot Password?</a>
                              </div>
                              <div className="text-center">
                                  <a className="small" href="register.html">Create an Account!</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

  </div>
    </div>ww3</div>
</div>
);
};
export default Login;