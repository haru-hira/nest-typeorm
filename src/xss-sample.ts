import express from 'express';

const app = express();

app.get('/greet', (req, res) => {
  const name = req.query.name; // ユーザー入力をそのまま返す
  // res.send(`<h1>Hello, ${name}</h1>`); // 悪意のあるスクリプトが埋め込まれる可能性あり
  res.json({ "data": `<h1>Hello, ${name}</h1>` }); // 正常なコード
});

app.listen(3000, () => console.log('Server running on port 3000'));
