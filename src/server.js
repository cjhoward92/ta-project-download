import http from 'http';

const buildServer = () => {
  const server = http.createServer((req, res) => {
    res.end('hello', 'utf-8');
  });

  const port = process.env.PORT || 3000;
  server.listen(port);
  console.log(`listening on port ${port}`); // eslint-disable-line

  return server;
};

export default buildServer;
