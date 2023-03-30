import {UserModel} from "../models/user.model.js"
import {Sequelize} from "sequelize";
import {Op} from "sequelize";
import {ChatModel} from "../models/chats.model.js";

 export class UserQueries {

    async registro(user){
        try    {
            const query  = await UserModel.create(user) ;
            if (query) {
                return {ok: true, data: query};
            }
        }catch (e) {
            console.log(' error  al ejecutar query',e );
            return {ok: false, data: null  }
        }
    }

     async encontrarUsuario(condition = {}){
         try {
             const query = await UserModel.findOne({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async actualizarPerfil(condition = {}){
         try {
             const query = await UserModel.update({
                 nombre: condition.nombre,
                 apellido: condition.apellido,
             },{ where: {
                     idusuario: condition.id,
                 }});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async actualizarActivo(condition = {}){
         try {
             const query = await UserModel.update({
                 activo: condition.activo
             },{ where: {
                     idusuario: condition.id,
                 }});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }



     async encontrarChats(condition = {}){
         try {
             const query = await UserModel.findAll({
             },{ where: {
                     idusuario: {
                         [Op.not]:condition.id
                     },
                 }});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async encontrarMensajes(condition = {}){
         try {
             const query = await ChatModel.findAll({
             },{ where: {idchat: true}});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async crearMensajes(body){
         try    {
             const query  = await ChatModel.create(body) ;
             if (query) {
                 return {ok: true, data: query};
             }
         }catch (e) {
             console.log(' error  al ejecutar query',e );
             return {ok: false, data: null  }
         }
     }

     async cerrarSesion(condition = {}){
         try {
             const query = await UserModel.update({
                 activo: condition.activo,
             },{ where: {
                     idusuario: condition.id,
                 }});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }


}

export const userQueries = new UserQueries();
