export function signIn (state, data) {
    state.token = data.token;
}

export function logOut (state) {
    state.token = null;
}