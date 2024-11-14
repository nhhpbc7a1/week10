import db from "../ultis/db.js";

export default {
    // findAll() {
    //     return [
    //         {CatID: 1, CatName: 'Laptop'},
    //         {CatID: 1, CatName: 'Mobile Phone'},
    //         {CatID: 1, CatName: 'TV'},
    //     ]
    // }
    findAll() {
        return db('categories');
    },

    add(entity) {
        return db('categories').insert(entity);
    },

    findById(id) {
        return db('categories').where('CatID',id).first();
    },

    del(id) {
        return db('categories').where('CatID', id).del();
    },
    patch(id, entity) {
        return db('categories').where('CatID', id).update(entity);
    }

}