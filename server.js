// Servidor Express
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Lista de datos simulados (los resultados de tu búsqueda)
const mockData = [
    { id: 1, title: 'Artículo sobre NativeScript y Angular', author: 'Ian', content: 'Contenido 1', isFavorite: false },
    { id: 2, title: 'Tutorial de Redux en móviles', author: 'Google', content: 'Contenido 2', isFavorite: false },
    { id: 3, title: 'Configuración de Ngrok y Express', author: 'DevTeam', content: 'Contenido 3', isFavorite: false },
    { id: 4, title: 'Guía práctica de almacenamiento local', author: 'Ian', content: 'Contenido 4', isFavorite: false },
];

app.use(cors()); // Permite peticiones desde la app nativa

// Webservice GET con filtrado por querystring
// Ejemplo: GET /api/articles?q=angular
app.get('/api/articles', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    console.log(`Búsqueda recibida: ${query}`);

    if (!query) {
        return res.json(mockData);
    }

    const filteredData = mockData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.author.toLowerCase().includes(query)
    );
    
    res.json(filteredData);
});

app.listen(port, () => {
    console.log(`Express API escuchando en http://localhost:${port}`);
});
