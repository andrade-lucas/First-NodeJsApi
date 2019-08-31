'use strict';

let errors = [];

function validationContract() {
    errors = [];
}

validationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

validationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

validationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

validationContract.prototype.isFixedLen = (value, len, message) => {
    if (value.length !== len)
        errors.push({ message: message });
}

validationContract.prototype.isTrue = (value, message) => {
    if (!value)
        errors.push({ message: message });
}

validationContract.prototype.isEmail = (value, message) => {
    var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

validationContract.prototype.errors = () => {
    return errors;
}

validationContract.prototype.clear = () => {
    errors = [];
}

validationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = validationContract;