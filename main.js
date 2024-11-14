import express from  'express';
import numeral from 'numeral';
import {dirname, extname} from 'path';
import {fileURLToPath} from 'url';
import { engine } from 'express-handlebars';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { url } from 'inspector';
import productService from './services/product.service.js';
import categoryService from './services/category.service.js';
const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'bs4',
    helpers: {
        format_number(value){
            return numeral(value).format('0,0') + ' đ';
        },
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/static',express.static('static'));

app.use(async function(req, res, next) {
    const categories = await categoryService.findAll();
    res.locals.lcCategories = categories;
    next();
})

app.get('/', function (req, res) {
    // res.send('hello world');
    res.render('home');
});

app.get('/test', function (req, res) {
    res.sendFile(__dirname + '/test.html');
});

app.get('/features', function (req, res) {
    res.render('features', {
        layout: 'bs4'
    });
});

app.get('/about', function(req, res) {
    const name = Math.floor(Math.random() * 100);
    res.render('about', {
        name: name,

    })
})


import categoryRouter from './routes/category.route.js';
app.use('/admin/categories', categoryRouter);

import productRouter from './routes/product.route.js';
app.use('/admin/products', productRouter);

import productUserRouter from './routes/product-user.route.js';
app.use('/products', productUserRouter);

app.listen(3000, function() {
    console.log('app is running at http://localhost:3000');
})


/* controller
- location? mainjs
- url
- function 
    - lấy dữ liệu thông qua 1 đối tượng service
    - chọn view để render

service
- đọc db
- lết npo61 hệ thống khác
- xử lý, tính toán

view (hbs)
- html
- lệnh trích xuất dữ liệu -> chuyển html hiển thị

knexjs framework dùng để liên kết db
knex cheatseat

await
async
ngắt flow, chờ promise
.then tương đương await, tùy chọn sử dụng
*/