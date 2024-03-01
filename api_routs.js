import express from 'express';

const app = express();

app.get('/api/sites', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'Site 1'
        },
        {
            id: 2,
            name: 'Site 2'
        }
    ]);
});

app.get('/*', (req, res) => {
    res.json({
        messsage: "not found"
    });
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
