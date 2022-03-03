const express = require('express');
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/renamegroup').put(protect, renameGroup);
router.route('/removeuserfromgroup').put(protect, removeUserFromGroup);
router.route('/addusertogroup').put(protect, addUserToGroup);

module.exports = router;
