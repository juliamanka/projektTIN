export const formValidationKeys = {
    notEmpty: 'notEmpty',
    len_2_60: 'len_2_60',
    len_5_60: 'len_5_60',
    isEmail: 'isEmail',
    isNumber: 'isNumber',
    isDate: 'isDate',
    isDimensions: 'isDimensions',
    len_10_150: 'len_10_150'
}

export function getValidationErrorKey(error) {
    if(error!=="") {
        return `validation.messages.${error}`
    }
    else return error;
}