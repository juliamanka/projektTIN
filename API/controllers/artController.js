const ArtRepository = require("../repository/sequelize/ArtworkRepository");
const ConsRepository = require("../repository/sequelize/ConservatorRepository");
exports.showArtList = (req,res,next) => {
    ArtRepository.getArtworks()
        .then(arts => {
            res.render('pages/artwork/list', {
                arts: arts,
                navLocation: 'arts'
            });
        });
}

exports.showAddArtForm = (req,res,next) => {
    res.render('pages/artwork/form', {
        arts: {},
        pageTitle: 'Nowe dzieło',
        formMode: 'createNew',
        btnLabel: 'Dodaj dzieło',
        formAction: '/artwork/add',
        navLocation: 'arts',
        validationErrors: []

    });
}

exports.showArtDetails = (req,res,next) => {
    const artId=req.params['artId'];
    console.log(artId);
    ArtRepository.getArtworkById(req.params['artId'])
        .then(arts => {
            res.render('pages/artwork/form', {
                arts: arts,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły dzieła sztuki',
                formAction:'',
                navLocation: 'arts',
                validationErrors: []

            });
        });
}

exports.showEditArtForm = (req,res,next) => {
    const artId=req.params.artId;
    ArtRepository.getArtworkById(artId)
        .then(arts => {
            res.render('pages/artwork/form',{
                arts: arts,
                formMode: 'edit',
                pageTitle: 'Edycja dzieła sztuki',
                btnLabel: 'Edytuj dzieło',
                formAction: '/artwork/edit',
                navLocation: 'arts',
                validationErrors: []

            });
        });
}

exports.addArtwork= (req,res,next) => {
    const artData= req.body;
    console.log(artData);
    console.log(artData.firstName);
    ArtRepository.createArtwork(artData) //nowy obiekt javascript kopiując dane z body
        .then( result => {
            res.redirect('/artwork');
        }).catch(err => {
        res.render('pages/artwork/form', {
            arts: artData,
            pageTitle: 'Dodawanie dzieła sztuki',
            formMode: 'createNew',
            btnLabel: 'Dodaj dzieło sztuki',
            formAction: '/artwork/add',
            navLocation: 'arts',
            validationErrors: err.errors
        });
    });
};
exports.updateArtwork = (req,res,next) => {
    const artId = req.body.artId;
    const artData = { ...req.body };
    ArtRepository.updateArtwork(artId,artData)
        .then(result => {
            res.redirect('/artwork');
        }).catch(err => {
        res.render('pages/artwork/form', {
            arts: artData,
            pageTitle: 'Edycja dzieła sztuki',
            formMode: 'edit',
            btnLabel: 'Edytuj dzieło sztuki',
            formAction: '/artwork/edit',
            navLocation: 'arts',
            validationErrors: err.errors
        });
    });
};
exports.deleteArtwork = (req,res,next) => {
    const artId = req.params.artId;
    ArtRepository.deleteArtwork(artId)
        .then(() => {
            res.redirect('/artwork');
        });
};