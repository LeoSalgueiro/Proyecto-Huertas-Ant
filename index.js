//  index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//importo los modelos
require('./models/Usuario');
require('./models/Nodo');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/Huertas-Ant`);

app.use(bodyParser.json());

//aca se importan las rutas
require('./routes/usuarioRoutes/usuarioRoutes')(app);
require('./routes/nodoRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});