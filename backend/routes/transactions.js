const { addIncome, getIncomes, deleteIncomes } = require('../controllers/income')

const router = require('express').Router()



router.post('/add-income',addIncome)
.get('/get-income',getIncomes)
.delete('/delete-income/:id',deleteIncomes)

module.exports = router