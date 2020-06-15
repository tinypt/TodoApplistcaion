let router = require('express').Router();

router.get('/', function(req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTHub crafted with love!',
  });
});

// //V2
// var listController = require('../Api/List');
// router
//   .route('/list')
//   .get(listController.index)
//   .post(listController.add);

// router
//   .route('/list/:list_id')
//   .get(listController.view)
//   .delete(listController.delete);

module.exports = router;
