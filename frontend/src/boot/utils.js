export function notifyWarning(context, msg) {
    context.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: msg
    });
}

export function notifyCreated(context, msg) {
    context.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: msg
      })
}