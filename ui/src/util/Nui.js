export default {
    async send(event, data = {}) {
        /// #if DEBUG
        return new Promise(resolve => setTimeout(resolve, 100));
        /// #endif

        /* eslint-disable no-unreachable */
        try {
            const res = await fetch(`https://hades-hud/${event}`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data),
            });
            return res;
        } catch (err) {
            // prevent unhandled promise rejection freezing UI; log for dev
            // emit a message event so client-side code can still handle gracefully
            console.error('Nui.send failed', event, err);
            window.dispatchEvent(new MessageEvent('message', { data: { type: 'NUI_ERROR', data: { event, error: String(err) } } }));
            return null;
        }
        /* eslint-enable no-unreachable  */
    },
    emulate(type, data = null) {
        window.dispatchEvent(
            new MessageEvent('message', {
                data: {
                    type,
                    data,
                },
            }),
        );
    },
};
