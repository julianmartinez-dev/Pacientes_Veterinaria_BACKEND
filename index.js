import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacientesRoutes from './routes/pacienteRoutes.js'

const app = express();

app.use(express.json())

dotenv.config();

conectarDB()

//Configurar CORS
const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin,callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origen del request esta permitido
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}
//Decirse a express que use estas configuraciones
app.use(cors( corsOptions ))

app.use('/api/veterinarios',veterinarioRoutes)
app.use('/api/pacientes', pacientesRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})