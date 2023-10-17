const http = require('http');
const host = '127.0.0.1';
const port = 3000;

let tasks = [
  {
    id: 1,
    description: 'Hacer la compra',
    completed: false
  },
  {
    id: 2,
    description: 'Estudiar para el examen',
    completed: false
  },
  {
    id: 3,
    description: 'Ejercicio de la mañana',
    completed: true
  }
];

const server = http.createServer((req, res) => {
  if (req.url === '/tasks' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
  }
});

server.listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}/tasks`);
});