export function signInAction (context, data) {
    context.commit('signIn', data);
}

export function logOutAction (context) {
    context.commit('logOut');
}
