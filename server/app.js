const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

// in-memory : 메모리(=휘발성)에 저장할 버킷리스트 목록
let idx = 3;
let buckets=[
  {
    id: 1,
    text: "에펠탑에서 사진찍기"
  },
  {
    id: 2,
    text: "설악산 단풍구경하기"
  },
]; //배열 (값을 여러개 저장)

app.use(cors());
app.use(express.json()); // json pasring
app.use(express.urlencoded({extended: false}));

app.get('/all', (req, res) => { // 버킷리스트를 수신
  res.json(buckets);
})

app.get('/all/:id', (req, res) => { // 특정 버킷리스트를 수신
  // console.log(req.params.id);
  const result = buckets.find(bucket => bucket.id === parseInt(req.params.id))
  res.json(result);
})

app.post('/add', (req, res) => { // 버킷리스트 항목을 송신
    console.log(req.body.text); // post 요청 텍스트를 확인
    buckets.push({
      id: idx++,
      text: req.body.text
    });
    res.json(buckets);
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// res.json({
// status: 400,
// message: '서버가 전송한 데이터'
// })