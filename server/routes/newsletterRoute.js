// /routes/newsletterRoutes.js
const express = require('express');
const router = express.Router();
const {
  getNewsletters,
  getNewsletterById,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter
} = require('../controllers/newsletterController');


router.get('/', getNewsletters);  
router.post('/', createNewsletter);  
router.put('/', updateNewsletter);  
router.delete('/', deleteNewsletter);  

module.exports = router;