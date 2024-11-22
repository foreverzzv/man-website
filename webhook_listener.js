const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/deploy') {
    // Run your deployment script
    exec('/var/www/alexeevschool/man-program/deploy.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`Exec error: ${error}`);
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }

      console.log(`Stdout: ${stdout}`);
      console.error(`Stderr: ${stderr}`);
      res.writeHead(200);
      res.end('Deployment successful');
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, () => {
  console.log('Webhook listener for alexeevschool running on port 3001...');
});
