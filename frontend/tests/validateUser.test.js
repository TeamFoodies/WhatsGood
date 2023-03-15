const validateUser = require('./validateUser')

test("returns false for invalid length - above max", () => {
    expect(validateUser("HeeHee19123456789123456788889")).toBe(false)
})
test("returns false for invalid length - below min", () => {
    expect(validateUser("us")).toBe(false)
})
test("returns false for invalid length - empty", () => {
    expect(validateUser("")).toBe(false)
})
test("returns true for being valid overall", () => {
    expect(validateUser("Shoan031")).toBe(true)
})
test("returns false for having special characters", () => {
    expect(validateUser("Urmom100$")).toBe(false)
})
