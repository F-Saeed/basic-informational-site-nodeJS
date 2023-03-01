const http = require('http');
const path = require('path');
const fs = require('fs');

// Server App
const app = http.createServer((request, response) => {
  let filePath = path.join(
    __dirname,
    'public',
    request.url === '/' ? 'index.html' : `${request.url}.html`
  );

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end(content, 'utf8');
          }
        );
      } else {
        response.writeHead(500);
        response.end(`Error ${err.code}`);
      }
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
