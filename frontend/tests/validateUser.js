function validateUser(username){
    //checks valid length
    const minLength = 3
    const maxLength = 20
    let validLength = false
    if(username.length >= minLength && username.length <= maxLength){
        validLength = true
    }

    //checks lower, upper case inclusion
    let hasLowerLetter = false
    let hasUpperLetter = false
    const lower_alphabet = "abcdefghijklmnopqrstuvwxyz"
    const upper_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for(const letter of lower_alphabet){
        if(username.includes(letter)){
            hasLowerLetter = true
        }
    }
    for(const letter of upper_alphabet){
        if(username.includes(letter)){
            hasUpperLetter = true
        }
    }

    //checks number inclusion
    let hasNumber = false
    const numbers = "0123456789"
    for(const digit of numbers){
        if(username.includes(digit)){
            hasNumber = true
        }
    }

      //checks for special characters that aren't underscore
      let hasInvalidSpecialChar = false
      const specialChar = "!@#$%^&*()<>?.,/"
      for(const char of specialChar){
          if(username.includes(char)){
              hasInvalidSpecialChar = true
          }
      }

    const validateUser = validLength && hasLowerLetter && hasUpperLetter && hasNumber && !hasInvalidSpecialChar
    return validateUser
}
module.exports = validateUser