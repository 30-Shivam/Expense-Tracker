const expenseSchema = require("../models/expenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const income = expenseSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a postive number'})
        }
        await income.save()
        res.status(200).json({message: "Expense Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
    console.log(income)
}

exports.getExpense = async (req,res) => {
    try {
        const incomes = await expenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: "Error"})
    }
}

exports.deleteExpense = async (req,res) => {
    const {id} = req.params;
    expenseSchema.findByIdAndDelete(id).then((income) => {
        res.status(200).json({message: "Expense Deleted"})
    })
    .catch((err) => {
        res.status(500).json({message: "Server Error"})
    })
}