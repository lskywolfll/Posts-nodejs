const auth = require('../../../auth');

function checkAuth(action) {

    function middleware(req, res, next) {

        switch (action) {
            case "update":
                // eslint-disable-next-line no-case-declarations
                const owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;

            default:
                next();
                break;
        }

    }

    return middleware;

}

module.exports = checkAuth