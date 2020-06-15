let express = require('express');
let app = express();
const connectDB = require('./DB/connection');

connectDB();
var port = process.env.PORT || 8080;

let apiRoutes = require('./api-routes');
app.use(express.json({extend: false}));
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api', apiRoutes);
app.use('/api/listModel', require('./Api/List'));
app.listen(port, function() {
  console.log('Running RestHub on port ' + port);
});
