const Joi = require("joi");

const errMessages = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "string.empty":
                err.message="Pole jest wymagane";
                break;
            case "string.min":
                err.message='Pole powinno zawierać conajmniej ${err.local.limit} znaki';
                break;
            case "string.max":
                err.message='Pole powinno zawierać najwyżej ${err.local.limit} znaków';
                break
            case "string.date":
                err.message='Pole powinno zawierać prawidłową datę';
                break
            default:
                break
        }
    });
    return errors;
}
const consSchema= Joi.object({
    consId: Joi.number().optional().allow(""),
    firstName: Joi.string().min(2).max(60).required().error(errMessages),
    lastName: Joi.string().min(2).max(60).required().error(errMessages),
    date: Joi.date().required().error(errMessages)
});


module.exports=consSchema;