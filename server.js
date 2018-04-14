const express = require('express');
const app = express();
console.log(1);
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname +'/public/index.html');
});
console.log(2);
app.listen(3000, () => {
    console.log('Server started.');
});
