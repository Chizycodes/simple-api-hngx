const express = require('express');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('../controllers/users');

const router = express.Router({ mergeParams: true });

router.route('/').get(getPersons).post(createPerson);

router.route('/:id').get(getPerson).patch(updatePerson).delete(deletePerson);

module.exports = router;
