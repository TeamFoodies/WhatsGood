const validatePassword = require('./validatePassword')

test("return false for no number", () => {
    expect(validatePassword("alphabetagamma")).toBe(false)
})
test("returns false for no lower case", () => {
    expect(validatePassword("ALPHABETAGAMMA22")).toBe(false)
})
test("returns false for no upper case", () => {
    expect(validatePassword("alphabetagamma24")).toBe(false)
})
test("returns false for invalid length", () => {
    expect(validatePassword("")).toBe(false)
})
test("returns true for being valid overall", () => {
    expect(validatePassword("AlphaBetaGamma244")).toBe(true)
})
