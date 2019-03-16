const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const crypto = require('crypto');

const app = express();

const port = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.listen(port, () => console.log(`Listening on port ${port}`));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/')
  },
  filename: function (req, file, callback) {
    console.log(req.body.key);
    console.log("headers within filename: " + req.headers);
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);
    
      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

var upload = multer({storage: storage});

app.post('/fileUpload',upload.array('file'), (req, res, next) => {
  //console.log(req);
  console.log("headers: " + req.headers);
  
  //start.js
  /*
  var spawn = require('child_process').spawn,
  py    = spawn('python', ['testChildProcess.py']),
  data = [1,2,3,4,5,6,7,8,9],
  dataString = '';

  py.stdout.on('data', function(data){
  dataString += data.toString();
  });
  py.stdout.on('end', function(){
  console.log('Sum of numbers=',dataString);
  });
  py.stdin.write(JSON.stringify(data));
  py.stdin.end();
  */
  /*
  var spawn = require('child_process').spawn;
  var ip    = "52.26.1.56";
  var port  = 8485;
  var py    = spawn('python', ['RAPhotoClient.py', ip, port]);

  py.stdout.on('data', function(data){
  dataString += data.toString();
  });

  py.stdout.on('end', function(){
  console.log('Python');
  });
  py.stdin.end();
  */

  if (!req.files) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
});

app.get('/', (req, res) => {
  res.send('<h1>hello</h1>');
});

