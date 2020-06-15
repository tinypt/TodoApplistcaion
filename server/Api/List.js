const express = require('express');
const mongoose = require('mongoose');
const List = require('../DB/List');
const route = express.Router();
//V1
//Get all
route.get('/', (req, res) => {
  List.find()
    .then(todos => {
      res.send(todos);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes.',
      });
    });
});
//Get 1 todo
route.get('/:_id', (req, res) => {
  const id = req.params._id;
  List.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({message: 'Not found Todo with id ' + id});
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({message: 'Error retrieving Todo with id=' + id});
    });
});
//create list
route.post('/', (req, res) => {
  if (!req.body.text) {
    return res.status(400).send({
      message: 'Todo content can not be empty',
    });
  }
  // Create a Todo
  const listModel = new List({
    text: req.body.text || 'Untitled Note',
    isDone: false,
  });
  listModel
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Note.',
      });
    });
});
// DELETE
route.delete('/:_id', (req, res) => {
  console.log(req.params._id)
  List.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send('List deleted');
  });
});

route.put('/:_id', (req, res) => {
  if (!req.body.isDone) {
    return res.status(400).send({
      message: 'Todo content can not be empty',
    });
  }
  List.findByIdAndUpdate(
    req.params._id,
    {
      isDone: true,
    },
    {new: true},
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'Todo not found with id ' + req.params._id,
        });
      }
      res.send(todo);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({
          message: 'Todo content can not found',
        });
      }
      return res.status(500).send({
        message: 'Can not update',
      });
    });
});

//V2
// index actions
// exports.index = (req, res) => {
//   List.get((err, list) => {
//     if (err) {
//       res.json({
//         status: 'error',
//         message: err,
//       });
//     }
//     res.json({
//       status: 'success',
//       message: 'List retrieved successfully',
//       data: list,
//     });
//   });
// };

// // create list actions
// exports.add = async (req, res) => {
//   const {text, isDone} = req.body;
//   let list = {};
//   list.text = text;
//   list.isDone = isDone;
//   let listModel = new List(list);
//   await listModel.save(err => {
//     res.json({
//       message: 'New todo created!',
//       data: list,
//     });
//   });
// };

// // view list info
// exports.view = function(req, res) {
//   List.findById(req.params.list_id, function(err, list) {
//     if (err) res.send(err);
//     res.json({
//       message: 'Todo details loading..',
//       data: list,
//     });
//   });
// };

// // delete list
// exports.delete = function(req, res) {
//   List.remove(
//     {
//       _id: req.params.list_id,
//     },
//     function(err, list) {
//       if (err) res.send(err);
//       res.json({
//         status: 'success',
//         message: 'List deleted',
//       });
//     },
//   );
// };
module.exports = route;
