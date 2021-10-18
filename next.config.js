// next.config.js
module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/guitar',
                permanent: true,
            },
        ]
    },
}