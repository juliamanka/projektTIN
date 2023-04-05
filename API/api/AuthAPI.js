const ConservatorRepository = require('../repository/sequelize/ConservatorRepository');
const UserRepository = require('../repository/sequelize/UserRepository')
const config = require("../config/auth/key")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    ConservatorRepository.findByEmail(email)
        .then(user => {
            if (!user) {
                return res.status(401).send({message: "Nieprawidłowy email lub hasło!"})
            }
            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({message: "Nieprawidłowy email lub hasło!"})
                    }
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user.consId,
                            role: user.role
                        },
                        config.secret,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({token: token, userId: user.consId, role: user.role})
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}
