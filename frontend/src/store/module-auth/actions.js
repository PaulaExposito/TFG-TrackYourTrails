export function signInAction (context, data) {
    context.commit('signIn', data);
}

export function setUsernameAction (context, data) {
    context.commit('setUsername', data);
}

export function logOutAction (context) {
    context.commit('logOut');
}
