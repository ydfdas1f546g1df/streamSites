import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
