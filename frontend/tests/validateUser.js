//a valid username: alphabet, numerics, underscore, no special chars, 3-20 chars
function validateUser(username){
    //checks valid length
    const minLength = 3
    const maxLength = 20
    let validLength = false
    if(username.length >= minLength && username.length <= maxLength){
        validLength = true
    }

      //checks for special characters that aren't underscore
      let hasInvalidSpecialChar = false
      const specialChar = "!@#$%^&*()<>?.,/"
      for(const char of specialChar){
          if(username.includes(char)){
              hasInvalidSpecialChar = true
          }
      }

    const validateUser = validLength && !hasInvalidSpecialChar
    return validateUser
}
module.exports = validateUser