const auth = require('../../../auth');

module.exports = function checkAuth(action) {

    function middleware(req, res, next) {


        switch (action) {
            case "update":
                // eslint-disable-next-line no-case-declarations
                const owner = req.body.id;
                auth.check.own(req, owner);
                break;

            default:
                next();
                break;
        }

    }

    return middleware;

}