function validatePassword(password){
    //checks valid length
    const minLength = 1
    const maxLength = 30
    let validLength = false
    if(password.length >= minLength && password.length <= maxLength){
        validLength = true
    }

    //checks lower, upper case inclusion
    let hasLowerLetter = false
    let hasUpperLetter = false
    const lower_alphabet = "abcdefghijklmnopqrstuvwxyz"
    const upper_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for(const letter of lower_alphabet){
        if(password.includes(letter)){
            hasLowerLetter = true
        }
    }
    for(const letter of upper_alphabet){
        if(password.includes(letter)){
            hasUpperLetter = true
        }
    }

    //checks number inclusion
    let hasNumber = false
    const numbers = "0123456789"
    for(const digit of numbers){
        if(password.includes(digit)){
            hasNumber = true
        }
    }

    const validPassword = validLength && hasLowerLetter && hasUpperLetter && hasNumber
    return validPassword
}
module.exports = validatePassword