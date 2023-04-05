const UserRepository = require('../repository/sequelize/UserRepository');
const ConsRepository = require("../repository/sequelize/ConservatorRepository");

exports.showAddUserForm = (req,res,next) => {
    res.render('pages/conservators/form', {
        cons: {},
        pageTitle: req.__('cons.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('cons.form.add.btnLabel'),
        formAction: '/conservators/add',
        navLocation: 'cons',
        validationErrors: []

    });
};

exports.addUser= (req,res,next) => {
    const consData= req.body;
    UserRepository.createUser(consData) //nowy obiekt javascript kopiując dane z body
        .then( result => {
            res.redirect('/users');
        }).catch(err => {
        res.render('pages/conservators/form', {
            cons: consData,
            pageTitle: req.__('cons.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('cons.form.add.btnLabel'),
            formAction: '/users/add',
            navLocation: 'cons',
            validationErrors: err.errors
        });
        err.errors.forEach(e => {
            if (e.path.includes('email') && e.type === 'unique violation') {
                e.message = req.__('validation.messages.emailError')
            }
        })
    });
};