const ConsArtRepository = require("../repository/sequelize/ArtConservatorRepository");
const ArtRepository = require("../repository/sequelize/ArtworkRepository");
const ConsRepository = require("../repository/sequelize/ConservatorRepository");
exports.showConsArtList = (req,res,next) => {
    ConsArtRepository.getArtConservators()
        .then(artCons => {
            res.render('pages/artconservator/list', {
                artCons: artCons,
                navLocation: 'consArt'
            });
        });
}

exports.showConsArtAddForm = (req,res,next) => {
    let allCons, allArts;
    ConsRepository.getConservators().
        then(cons => {
            allCons = cons;
            return ArtRepository.getArtworks();
    })
        .then(arts => {
            allArts = arts;
            res.render('pages/artconservator/form', {
                artCons: {},
                formMode: 'createNew',
                allCons: allCons,
                allArts: allArts,
                pageTitle: 'Nowe zlecenie',
                btnLabel: 'Dodaj zlecenie',
                formAction: '/artconservator/add',
                navLocation: 'consArt',
                validationErrors: []

            });
        });
}

exports.showConsArtDetails = (req,res,next) => {
    const artConsId=req.params.artConsId;
    let allCons, allArts;
    ConsRepository.getConservators().
    then(cons => {
        allCons = cons;
        return ArtRepository.getArtworks();
    })
        .then(arts => {
            allArts = arts;
            return ConsArtRepository.getArtConservatorById(artConsId)
        }).
        then(artCons=>{
            res.render('pages/artconservator/form', {
                artCons: artCons,
                formMode: 'showDetails',
                allCons: allCons,
                allArts: allArts,
                pageTitle: 'Szczegóły zlecenia',
                formAction: '/artconservator/details'+artConsId,
                navLocation: 'consArt',
                validationErrors: []

            });
        });
}
exports.showConsArtEditForm = (req,res,next) => { //TODO: przekopiować to z showAddForm żeby wczytywało poprawnie allCons
    let allCons, allArts;
    const artConsId=req.params.artConsId;
    ConsRepository.getConservators().
    then(cons => {
        allCons = cons;
        return ArtRepository.getArtworks();
    })
        .then(arts => {
            allArts = arts;
            return ConsArtRepository.getArtConservatorById(artConsId)
        }).then(artCons => {
            res.render('pages/artconservator/form', {
                artCons: artCons,
                formMode: 'createNew',
                allCons: allCons,
                allArts: allArts,
                pageTitle: 'Edycja zlecenie',
                btnLabel: 'Edytuj zlecenie',
                formAction: '/artconservator/edit',
                navLocation: 'consArt',
                validationErrors: []
            });
        });
};

exports.addArtConservator = (req,res,next) => {
    const artConsData = req.body;
    artConsData.dateTo=artConsData.dateTo.length===0? null : artConsData.dateTo;
    const artConsId = req.body.artConsId;
    let allCons, allArts;
    ConsRepository.getConservators().
    then(cons => {
        allCons=cons;
        return ArtRepository.getArtworks();
    }).then(arts=>{
        allArts=arts;
            return ConsArtRepository.createArtConservator(artConsData).
        then(result=> {
            res.redirect('/artconservator');
        }).catch(err=>{
            res.render('pages/artconservator/form',{
                artCons: artConsData,
                pageTitle: 'Nowe zlecenie',
                formMode: 'createNew',
                btnLabel: 'Dodaj zlecenie',
                allCons: allCons,
                allArts:allArts,
                formAction: '/artconservator/add',
                navLocation: 'consArt',
                validationErrors: err.errors
            })
        })
    })
};
exports.updateArtConservator = (req,res,next) => {
    const artConsData = req.body;
    artConsData.dateTo=artConsData.dateTo.length===0? null : artConsData.dateTo;
    const artConsId = req.body.artConsId;
    let allCons, allArts;
    ConsRepository.getConservators().
        then(cons => {
            allCons=cons;
            return ArtRepository.getArtworks();
    }).then(arts=>{
        allArts=arts;
        return ConsArtRepository.updateArtConservator(artConsId,artConsData).
            then(result=> {
            res.redirect('/artconservator');
        }).catch(err=>{
                res.render('pages/artconservator/form',{
                    artCons: artConsData,
                    pageTitle: 'Edycja zlecenia',
                    formMode: 'edit',
                    btnLabel: 'Edytuj zlecenie',
                    allCons: allCons,
                    allArts:allArts,
                    formAction: '/artconservator/edit',
                    navLocation: 'consArt',
                    validationErrors: err.errors
                })
        })
    })
};
exports.deleteArtConservator = (req,res,next) => {
    const artConsId = req.params.artConsId;
    ConsArtRepository.deleteArtConservator(artConsId)
        .then(() => {
            res.redirect('/artconservator');
        });
};