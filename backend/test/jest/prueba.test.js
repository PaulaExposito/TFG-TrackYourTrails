const User = require('../../models/User');
const password = "pass123";
const user = new User({"password": password});


describe("User model tests", () => {

  let encryptPass;

  beforeAll(async () => {
    encryptPass = await user.encryptPass(password);
  });
  
  test('Encrypt password', async () => {
    expect(encryptPass).not.toBe(null);
    expect(typeof encryptPass).toBe('string');
  });
  
  test('Validate pass (pass)', async () => {
    const validatePass = await user.validatePass(password);
    expect(validatePass).not.toBe(true);
  });
  
  test('Validate pass (fails)', async () => {
    const validatePass = await user.validatePass("badPassword");
    expect(validatePass).toBe(false);
  });

});