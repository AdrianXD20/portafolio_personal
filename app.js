const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const body = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const specs = require('./swagger/swagger.js');
const env = require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes.js');
const proyectoRoutes = require('./routes/proyectoRoutes.js');
const notaRoutes = require('./routes/notaRoutes.js');
const logroRoutes = require('./routes/logroRoutes.js');
const experienciaRoutes = require('./routes/experienciaRoutes.js');
const actividadRoutes = require('./routes/actividadRoutes.js');
const ClaseRoutes = require('./routes/claseRoutes.js');


const allowed = [
    'https://AdrianXD20.github.io', 
    'http://localhost:3000',
    'https://portafolio-personal-uy4r.onrender.com',
    'CC-15-31-A0-5D-75',
    `http://localhost:5173`,
    'CC-15-31-A0-5D-76',/*IP de Alexander*/
    'http://192.168.0.104:8081',/*IP de Frenks*/
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowed.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use("/docs", swaggerUI.serve,swaggerUI.setup(specs))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('images')); 
app.use(body.urlencoded({ extended: false }));
app.use(body.json()); 



app.use('/', usuarioRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/notas', notaRoutes);
app.use('/logros', logroRoutes);
app.use('/experiencias', experienciaRoutes);
app.use('/actividades', actividadRoutes);
app.use('/clases', ClaseRoutes);


// Puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

