const express = require('express');
const basicAuth = require('express-basic-auth');
const morgan = require('morgan');
const db = require('./db');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', async (req, res) => {
    try {
        await db.Report.create({
            room: req.body.room,
            class: req.body.class,
            students: req.body.uids.map((uid, i) => ({
                uid,
                name: req.body.names[i],
                info: req.body.infos[i],
            })),
        });

        res.render('index', {
            message: 'Laporan berhasil dikirim.',
            isError: false,
        });
    } catch (err) {
        res.render('index', {
            message: 'Laporan tidak terkirim, silahkan coba lagi.',
            isError: true,
        });
    }
});
app.use(
    '/admin',
    basicAuth({
        users: {
            [process.env.ADMIN_USERNAME || 'admin']: process.env.ADMIN_PASSWORD || 'admin',
        },
        challenge: true,
        realm: 'Imb4T3st4pp',
    })
);
app.get('/admin', async (req, res) => {
    const reports = await db.Report.find();
    res.render('admin', { reports });
});
app.post('/admin/reset', async (req, res) => {
    await db.Report.remove({});
    res.redirect('/admin');
});

app.listen(port, () => console.log('App running at port', port));
