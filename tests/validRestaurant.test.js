/*import {id_schema as validRestaurant} from '../backend/src/routes/restaurant.route';

test("return true for valid restaurant creation", () => {
    let noError = false
    const {error, value} =  validRestaurant.validate({name: 'The Cheesecake Factory', address: '123 Door Ave', latitude: '35', longitude: '-179', auth_key: 'fnwej134'})
    if(error){
        noError = true
    }
    expect(noError).toBe(true)
})
test("return false for non-valid restaurant creation", () => {
    let noError = false
    const {error, value} =  validRestaurant.validate({name: 'The Cheesecake Factory... and more characters', address: '123 Door Ave', latitude: '35', longitude: '-187', auth_key: 'fnwej134'})
    if(error){
        noError = true
    }
    expect(noError).toBe(false)
})
*/

/*id_schema.validate(valid object)
const {error, value} = create_account_route.schema.validate({username: 'sdkjfhjsdhfjkdsf', password: 'sdakjfhksdjahfsdf'})
if (error) {
  // Test failed
  return;
}


// Test passed!
*/

/*const {mongo} = require('../backend/src/controllers/database.controller');
test("return true for mongo database instance", () => {
    let noError = false
    let instance = mongo
    if(instance){
        noError = true
    }
    expect(noError).toBe(true)
})*/

/*const login_controller = require('../backend/src/controllers/login.controller');
test("return false for non-authorized key", () => {
    let auth = login_controller.logout("verfbrh2323")
    expect(auth).toBe(false)
})*/
