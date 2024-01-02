const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

router.get('/', (req,res) => {
    res.render('customer/addOrEdit',{
        viewTitle: "Insert Customer"
    })
})
router.post('/', async (req,res) =>{
    if(req.body._id == ''){
        await insertRecord(req,res)
    } else {
        await updateRecord(req,res)
    }
})

async function insertRecord(req, res) {
    var customer = new Customer()
    customer.fullName = req.body.fullName;
    customer.email = req.body.email;
    customer.mobile = req.body.mobile;
    customer.description = req.body.description;
    try {
        await customer.save()
        res.redirect('customer/list')
    } catch (err) {
        console.log('Error During Insert:' + err)
    }
}

async function updateRecord(req, res) {
    try {
        await Customer.findOneAndUpdate(
            {_id: req.body._id},
            req.body, {new: true}
        )
        res.redirect("customer/list");
    } catch (err) {
        console.log('Error During Update:' + err);
    }
}

router.get('/list', async (req,res) =>{
    try {
        const docs = await Customer.find()
        res.render('customer/list',{
            list: docs
        })
    } catch (err) {
        console.log('Error During Retrieval:' + err);
    }
})

router.get('/:id', async (req,res) =>{
    try {
        const doc = await Customer.findById(req.params.id)
        res.render('customer/addOrEdit', {
            viewTitle: 'Update Customer', customer: doc
        })
        console.log(doc);
    } catch (err) {
        console.log('Error During Retrieval:' + err);
    }
});

router.get("/delete/:id", async (req,res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id)
        res.render("customer/list")
    } catch (err) {
        console.log("Error in Deletion" + err);
    }
});

module.exports = router;