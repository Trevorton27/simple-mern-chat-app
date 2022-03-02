const express = require('express');
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);

module.exports = router;
