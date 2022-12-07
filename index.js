/* Core five steps
1. require express
2. app = express()
3. port = 5000;
4. app.get('/', .....)
5. app.listen(port, .....)

*/

const express = require('express');
// allowing client to fetch data using CORS policy
const cors = require('cors');

const app = express();

// calling CORS
app.use(cors());

// front-end thk pathano data receive krte problem hy, to solve it, we use express.json as middleware
app.use(express.json())


// use port from process environment, otherwise use 5000
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Missed coding???');
})

// create a few dummy users
const users = [
  { id: 1, name: 'Diaz', email: 'diaz@yahoo.com', phone: '2342' },
  { id: 2, name: 'Riyaz', email: 'riyaz@gmail.com', phone: '3498' },
  { id: 3, name: 'Niaj', email: 'niaj@hotmail.com', phone: '6871' },
  { id: 4, name: 'Areen', email: 'areen@juniv.edu', phone: '6899' },
]

// users route
app.get('/users', (req, res) => {
  console.log('query', req.query);
  // search query filter
  if(req.query.name) {
    const search = req.query.name.toLowerCase();
    const matched = users.filter(user => user.name.toLowerCase().includes(search));
    res.send(matched);
  } else {
    res.send(users);
  }
})


// individual user's
app.get('/user/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  // eikhane === dewa jabena, cause eikhane id number BUT browser a string!
  const user = users.find(u => u.id == id);
  res.send(user);
})


app.post('/user', (req, res) => {
  console.log('request', req.body);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
})


app.listen(port, () => {
  console.log('listening now haha', port);
})