const auth = require('../../services/auth');

const rightTestDTO = {
    username: "tester",
    password: "tester123"
};

const wrongTestDTO_user = {
    username: "tester"
};

const wrongTestDTO_pass = {
    password: "tester123"
};

test('Check if user DTO is not complete', async () => {
    const result = await auth.signup(wrongTestDTO_user);
    expect(result).toBe(-1);
});

test('Check if user DTO is not complete', async () => {
    const result = await auth.signup(wrongTestDTO_pass);
    expect(result).toBe(-1);
});

test('Logout successfully', async () => {
    const result = await auth.logout(rightTestDTO).then(data => { return data; });
    expect(auth.logout(rightTestDTO)).toBeInstanceOf(Object);
    expect(result.token).toBe(null);
});

test('Logout fails', async () => {
    const result = await auth.logout(wrongTestDTO_pass).then(data => { return data; });
    expect(result).toBe(-1);
});