// Lógica para conexión a Mongo

var mongoose = require('mongoose'),
    random   = require('mongoose-query-random') 

    // Crear Coleccion
    Schema = new mongoose.Schema({

        // --- Atributos Comunes --- //
        nombre              : "string",
        password            : "string",
        correo              : "string",
        idioma              : "string",
        foto_perfil         : "string",
        rol                 : "string",
        tutorial            : "string",

        // --- Atributos -> Empresario & Oferente --- //
        actividad_empresa   : "string",

        // --- Atributos -> Empresario & Trabajador --- //
        nombre_empresa      : "string",
        id_empresa          : "string",
        
        // --- Atributos -> Trabajador & Oferente --- //

        // --- Atributos: Empresario --- //
        aparece_oferente    : "string",
        imagen_empresa      : "string",
        
        // --- Atributos: Trabajador --- //
        departamento        : "string",

        // --- Atributos: Oferente --- //

        // --- CLAVES PRIMARIAS --- //
        dni                 : "string",

        // ------------ CHAT -------
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: String,
        date: { type: Date, default: Date.now }

      
        
    },
    {   // Nombre Coleccion
        collection : "teamwork"
    })

    // Conexión con Mongo
    const conn = mongoose.createConnection(`mongodb://127.0.0.1:27017/TEAMWORK`)

    const TeamworkModel = conn.model("teamwork", Schema)
    
    // Exportamos el Módulo
module.exports = TeamworkModel