const validateUser = require('./validateUser')

test("return false for no number", () => {
    expect(validateUser("shoan")).toBe(false)
})
test("returns false for no lower case", () => {
    expect(validateUser("SHOAN031")).toBe(false)
})
test("returns false for no upper case", () => {
    expect(validateUser("shoan031")).toBe(false)
})
test("returns false for invalid length", () => {
    expect(validateUser("HeeHee19123456789123456788889")).toBe(false)
})
test("returns true for being valid overall", () => {
    expect(validateUser("Shoan031")).toBe(true)
})
test("returns false for having special characters", () => {
    expect(validateUser("Urmom100$")).toBe(false)
})
