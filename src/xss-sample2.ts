import express from 'express';

const app = express();

app.get('/greet2', (req, res) => {
  const name = req.query.name; // ユーザー入力をそのまま返す
  res.send(`<h1>Hello, ${name}</h1>`); // 悪意のあるスクリプトが埋め込まれる可能性あり
});

app.listen(3000, () => console.log('Server running on port 3000'));
