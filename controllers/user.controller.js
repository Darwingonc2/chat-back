import {request , response} from "express";
import {userQueries} from "../queries/user.queries.js";
import {Payload} from "../helpers/payload.js";
import bcrypt from "bcrypt";
import {UserModel} from "../models/user.model.js";

class UserController {

    static payload = new Payload()



    //CRUD PERFILES

    async login(req, res){
        const body = req.body;
        const query = await userQueries.encontrarUsuario({
            correo: body.correo,
            password: body.password
        });
        if(query && query.ok){
            try {
                const token = UserController.payload.createToken(query.data);
                return res.status(200).send({
                    ok: true,
                    token: token,
                    data: query.data
                });
            } catch (e){
                return res.status(200).send({
                    ok: false,
                    data: null
                });
            }

        } else {
            return res.status(200).send({
                ok: false,
                data: null
            });
        }
    }

    async registros (req, res){
        const body = req.body;
        /*body.password = await bcrypt.hash(body.password, 8);*/
        const query =   await userQueries.registro(body);
        if(query.ok){
            try {
                const token = UserController.payload.createToken(query.data);
                return res.status(200).send({
                    ok: true,
                    token: token,
                    data: query.data
                });
            } catch (e){
                return res.status(200).send({
                    ok: false,
                    data: null
                });
            }

        } else {
            return res.status(200).send({
                ok: false,
                data: null
            });
        }
    }

    async encontrarUsuario(req, res) {
        const body = req.body
        const query = await userQueries.encontrarUsuario({
                idusuario: body.id,
            }
        );
        if (query.ok) {
            return res.status(200).json({ ok: true, data: query.data });
        } else {
            return res.status(200).json({ ok: false, data: 'Error' });
        }
    }

    async actualizarPerfil(req,res) {
        const body = req.body;
        const query = await userQueries.actualizarPerfil({
            id: body.id,
            nombre: body.nombre,
            apellido: body.apellido,
        });
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async actualizarActivo(req,res) {
        const body = req.body;
        const query = await userQueries.actualizarActivo({
            id: body.id,
            activo: body.activo,
        });
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async encontrarChats(req,res) {
        const body = req.body;
        const query = await userQueries.encontrarChats({
            id: body.id,
        });
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async encontrarMensajes(req,res) {
        const body = req.body;
        const query = await userQueries.encontrarMensajes({});
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async crearMensaje(req,res) {
        const body = req.body;
        const query = await userQueries.crearMensajes(body);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async cerrarSesion(req,res) {
        const body = req.body;
        const query = await userQueries.cerrarSesion({
            id: body.id,
            activo: body.activo,
        });
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }




}

export const userController = new UserController();


