import express from "express";
import {userController} from '../controllers/user.controller.js'
import {validateToken} from "../middlewares/accessToken.middleware.js";



export class  Routes   {

    routes(app =  express.application)  {
        app.get('/', (req, res) => {
            res.send(" hola mundo");
        }) ;

         //RUTAS PERFILES

        app.post('/login', userController.login);

        app.post('/registro', userController.registros);

        app.post('/encontrar_usuario', userController.encontrarUsuario)

        app.post('/encontrar_chats', userController.encontrarChats)

        app.route('/encontrar_mensajes').get(userController.encontrarMensajes)

        app.route('/actualizar_perfil').patch([validateToken.validateJWT], userController.actualizarPerfil);

        app.route('/crear_mensaje').post([validateToken.validateJWT], userController.crearMensaje);

        app.route('/actualizar_activo').patch(userController.actualizarActivo);

        app.route('/cerrar_sesion').patch( userController.cerrarSesion);





    }
}
