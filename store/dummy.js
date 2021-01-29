const db = {
    user: [
        { id: "1", name: "Carlos" }
    ]
};


async function list(tabla) {
    return db[tabla];
}

async function get(tabla, id) {
    let collection = await list(tabla);
    return collection.find(item => item.id === id) || null;
}

async function upsert(tabla, data) {
    await db[tabla].push(data);
    return await list(tabla);
}

async function remove(tabla, id) { //eslint-disable-line
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}