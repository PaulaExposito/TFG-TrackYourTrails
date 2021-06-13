export function signIn (state, data) {
    state.token = data.token;
    state.username = data.username;
}

export function setUsername (state, data) {
    state.username = data;
}

export function logOut (state) {
    state.token = null;
    state.username = null;
}