const sequelize = require('./sequelize');
const authUtil = require('../../utils/authUtils');

const Conservator = require("../../model/sequelize/Conservator");
const Artwork = require("../../model/sequelize/Artwork");
const ArtConservator = require("../../model/sequelize/ArtConservator");
const Users = require("../../model/sequelize/User")

module.exports = () => {
    Conservator.hasMany(ArtConservator, {as: 'artConservators', foreignKey: {name: 'consId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    ArtConservator.belongsTo(Conservator, {as:'conservator', foreignKey: {name:'consId',allowNull: false}});
    Artwork.hasMany(ArtConservator,{as:'artConservators', foreignKey: {name:'artId', allowNull: false}, constraints: true, onDelete:'CASCADE'});
    ArtConservator.belongsTo(Artwork, {as: 'artwork', foreignKey:{name:'artId',allowNull:false}});

    const passHash=authUtil.hashPassword('12345');

    let allCons, allArts;
    return sequelize.
    sync( {force:true} )
        .then(() => {
            return Users.findAll();
        } ).
        then( () => {
            return Conservator.findAll();
    }).then(cons => {
        if(!cons || cons.length==0){
            return Conservator.bulkCreate([
                {firstName:'Jan', lastName:'Kowalski',date:'12-10-2018', email:'jankowalski@email.com',password:passHash, role: 'user'},
                {firstName: 'Andrzej',lastName: 'Andrzejewski',date: '12-10-2018', email:'andrzejandrzejewski@email.com',password:authUtil.hashPassword('76543'), role:'user'},
                {firstName: 'Admin',lastName: 'Admin',date: '12-10-2018', email:'admin@admin.com',password:authUtil.hashPassword('admin12'), role:'admin'}

            ])
                .then( () => {
                    return Conservator.findAll();
            });
        } else {
            return cons;
        }
    })
        .then( cons => {
            allCons = cons;
            return Artwork.findAll();
    })
        .then(arts => {
            if(!arts || arts.length==0){
                return Artwork.bulkCreate([
                    {title: 'Venus', price: 45000, type:'obraz', dimensions:'100x200cm'},
                    {title:'Silueta pt 3', price: 30000, type: 'rzeźba', dimensions:'123x45x130cm'},
                    {title:'The Light', price: 13000, type:'obraz', dimensions: '67x90cm'}
            ])
                    .then( () =>{
                return Artwork.findAll();
            });
        }else{
            return arts;
        }
    }).then(arts => {
        allArts = arts;
        return ArtConservator.findAll();
    }).then(artCons => {
        if(!artCons || artCons.length==0){
            return ArtConservator.bulkCreate([
                {consId: 1, firstName: 'Jan', lastName:'Kowalski',artId: 1,title:'Venus', price:11450.56, dateFrom:'2019-11-03',dateTo: null, comment: 'Praca przebiega według harmonogramu'},
                {consId: 1, firstName: 'Jan', lastName:'Kowalski', artId: 3, title: 'The Light', price: 5600, dateFrom: '2019-10-09', dateTo: '2019-11-03', comment:'W trakcie renowacji odnaleziono wiele uszczervków w oryginalnej farbie'},
                {consId: 2, firstName: 'Andrzej', lastName:'Andrzejewski', artId: 2, title:'Silueta pt 3', price: 15690, dateFrom: '2020-03-19', dateTo:'2020-06-10', comment: 'Odnowa wykonana przy użyciu substancji zbliżonych w strukturze i barwie do oryginału'}
            ]);
        }else{
            return artCons;
        }
    });

};