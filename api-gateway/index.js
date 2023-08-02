const gateway = require("fast-gateway");

const port = process.env.PORT || 3000;

const server = gateway({
    routes: [
        {
            prefix: '/auth',
            target: 'http://auth:3001',
            hooks: {},
        },
        {
            prefix: '/uploader',
            target: 'http://uploader:3003',
            hooks: {},
        },
        {
            prefix: '/extractor',
            target: 'http://extractor:3002',
            hooks: {},
        },
    ],
});

server.get('/mytesting', (req, res) => {
    console.log('Gateway Called');
    res.send('Gateway Called');
});

server.start(port).then(() => {
    console.log(`Gateway is running on port ${port}`);
});
