const express = require('express');

const {
  getAlbum,
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum
} = require('../controllers/albums');

const router = express.Router();

// GET all albums, POST create album
router.route('/')
  .get(getAlbums)
  .post(createAlbum);

// GET one album, PUT update, DELETE remove
router.route('/:id')
  .get(getAlbum)
  .put(updateAlbum)
  .delete(deleteAlbum);

module.exports = router;