const ConsRepository = require('../repository/sequelize/ConservatorRepository');

exports.showConservatorList = (req,res,next) => {
    ConsRepository.getConservators()
        .then(cons => {
            res.render('pages/conservators/list', {
                cons: cons,
                navLocation: 'cons'
            });
        });
};

exports.showAddConservatorForm = (req,res,next) => {
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

exports.showEditConservatorForm = (req,res,next) => {
    const consId=req.params['consId'];
    ConsRepository.getConservatorById(req.params['consId'])
        .then(cons => {
            res.render('pages/conservators/form',{
                cons: cons,
                formMode: 'edit',
                pageTitle: req.__('cons.form.edit.pageTitle'),
                btnLabel: req.__('cons.form.edit.btnLabel'),
                formAction: '/conservators/edit',
                navLocation: 'cons',
                validationErrors: []

            });
        });
};

exports.showConservatorDetails = (req,res,next) => {
    const consId=req.params['consId'];
    ConsRepository.getConservatorById(req.params['consId'])
        .then(cons => {
            res.render('pages/conservators/form', {
                cons: cons,
                formMode: 'showDetails',
                pageTitle: req.__('cons.details.pageTitle'),
                formAction:'',
                navLocation: 'cons',
                validationErrors: []
            });
        });
};

exports.addConservator= (req,res,next) => {
    const consData= req.body;
    ConsRepository.createConservator(consData) //nowy obiekt javascript kopiując dane z body
        .then( result => {
            res.redirect('/conservators');
        }).catch(err => {
            res.render('pages/conservators/form', {
                cons: consData,
                pageTitle: req.__('cons.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('cons.form.add.btnLabel'),
                formAction: '/conservators/add',
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
exports.updateConservator = (req,res,next) => {
    const consId = req.body.consId;
    const consData = { ...req.body };
    ConsRepository.updateConservator(consId,consData)
        .then(result => {
            res.redirect('/conservators');
        }).catch(err => {
        err.errors.forEach(e=>{
            if(e.path.includes('email') && e.type==='unique validation') {
                e.message = req.__('validation.messages.emailError')
            }
        });
        res.render('pages/conservators/form', {
            cons: consData,
            pageTitle:req.__('cons.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('cons.form.edit.btnLabel'),
            formAction: '/conservators/edit',
            navLocation: 'cons',
            validationErrors: err.errors
        });
    });
};
exports.deleteConservator = (req,res,next) => {
    const consId = req.params.consId;
    ConsRepository.deleteConservator(consId)
        .then(() => {
            res.redirect('/conservators');
        });
};




