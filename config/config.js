import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv' ;
import {Database} from "./database.js";
import {Routes} from '../routes/routes.js';
/*import { Server } from "socket.io";*/
import {Server as SocketServer} from 'socket.io'  ;


dotenv.config();

class App {
    app = express.application;
    http = null
    routes = new Routes();
    db = new Database();
    server = new SocketServer();
    io = null;
    bot = null;

    constructor() {
        this.initializeApp()
    }


    async initializeApp() {
        this.app = express();
        this.config()
        this.http = http.createServer(this.app)
        await this.initDatabase();
        this.routes.routes(this.app);
        this.io = new SocketServer(this.http, {
            cors: {

                origin: '*',
            }
        })

        await this.socket(this.io)
        /*this.bot = new Telegraf(process.env.BOT_TOKEN);*/
        /*await this.initBotListening(this.bot);*/
    }


    config() {
        this.app.use(
            express.urlencoded({
                extended: true
            }))

        this.app.use(express.json());

        this.app.use(cors({origin: '*'}));
    }

    async initDatabase() {
        const connection = await this.db.connection();
        console.log(connection.message);
    }

    async socket(io) {
        /*io.on('connection', socket => {
            socket.emit('request', /!* … *!/); // emit an event to the socket
            io.emit('broadcast', /!* … *!/); // emit an event to all connected sockets
            socket.on('reply', () => { /!* … *!/
            }); // listen to the event
        });*/

        io.on('connection', (socket) => {

            console.log("nuevo usuario conectado");

            socket.on("test", ()=> {
                console.log("evento test")
            })

            /*socket.emit('mensajes-existentes', mensajes);*/
            socket.on("todosMensajes", (todosMensajes) =>{
                console.log("todosMensajes", todosMensajes);
                socket.emit("enviarTodosMensajes", todosMensajes);
            });

            socket.on("enviarMensaje", (mensajesocket)=>{
                console.log("este es el mensaje en sockets", mensajesocket);
                /*todosMensajes.push(mensajesocket);*/
                socket.broadcast.emit("recibirMensaje", mensajesocket);
                console.log("enviado de vuelta")
            })


            /*socket.on('mensajes-existentes', mensajes);

            socket.on('nuevo-mensaje', (mensaje) => {
                // Agregar el nuevo mensaje al array de mensajes
                this.mensajes.push(mensaje);

                // Emitir el mensaje a todos los usuarios conectados
                io.emit('nuevo-mensaje', mensaje);
            });*/
        })

        /*io.on('connection', (socket) => {
            socket.on('message', async (mensaje) => {

                /!*const currentDate = new Date();
                const currentTime = currentDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });*!/
                socket.broadcast.emit('message', mensaje);
                console.log("mensaje del socket.io", mensaje);
            })

            socket.on('disconnect', async () => {
                console.log('user disconnected', socket.id);
            });
        })*/
    }


    /*async initBotListening(bot){
        bot.on('text', (ctx) => {
            console.log('Incoming message: ', ctx.message.text);
            //Explicit usage
            //ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

            //ctx.reply(`Hello ${ctx.state.role}`);
        });

        bot.startPolling(30, 100, null, (data) => {
            console.log('startPolling');
            console.log(data);
        })

    }*/
}

export default new App();
