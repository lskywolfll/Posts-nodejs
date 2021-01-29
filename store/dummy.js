const db = {
    user: [
        { id: 1, name: "Carlos" }
    ]
};


function list(tabla) {
    return db[tabla];
}

function get(tabla, id) {
    let collection = db[tabla];
    return collection.filter(item => item.id === id)[0] || null;
}

function upsert(tabla, data) {
    db[tabla].push(data);
}

function remove(tabla, id) { //eslint-disable-line
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}