
package com.Restaurante.Servicios.Service.Implement;

import com.Restaurante.Servicios.Models.Usuario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.Restaurante.Servicios.Dao.UsuarioDao;
import com.Restaurante.Servicios.Service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService{
  @Autowired
    private UsuarioDao usuarioDao;
       @Override
  @Transactional(readOnly = true)
    public Usuario login(String usuario, String contrasena) {
        Usuario user = usuarioDao.login(usuario, contrasena);
        if (user == null) {
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
        return user;
    }
}
