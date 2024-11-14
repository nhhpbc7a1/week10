import express from 'express';
import productService from '../services/product.service.js';

const router = express.Router();

//products/byCat?id=1
// router.get('/byCat',async function(req, res) {
//     const id = +req.query.id || 0;
//     const list = await productService.findByCatId(id);
//     console.log(list);
//     res.render('vwProduct/byCat', {
//         products: list,
//         empty: list.length === 0,
//     }); 
// });

//products/byCat?id=1&page=1
router.get('/byCat',async function(req, res) {
    const id = req.query.id || 0;
    const limit = 4; // default limit is 10
    const current_page = req.query.page || 1;
    const offset = (current_page - 1 ) * limit;

    const nRows = await productService.countByCatId(id);
    const nPages = Math.ceil(nRows.total/ limit);
    const pageNumbers = [];
    for (let i = 0; i < nPages; i++) {
        pageNumbers.push({
            value: i + 1,
            active: (i + 1) === +current_page
        });
    }

    const list = await productService.findPageByCatId(id, limit, offset);
    // console.log(list);
    res.render('vwProduct/byCat', {
        products: list,
        empty: list.length === 0,
        pageNumbers: pageNumbers,
        catId: id,
    }); 
});

//products/detail?id=1
router.get('/detail', async function(req, res) {
    const id = req.query.id || 0;
    const product = await productService.findById(id);
    console.log(product);
    res.render('vwProduct/detail', {
        product: product
    });
});


export default router;