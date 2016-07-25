/**
 * Created by tyrion on 16-7-25.
 */
exports.authorized_required = function(req, res, next) {
    console.log("infilter req.session[session_id:"+req.session.id+"]"+JSON.stringify(req.session));
    if (!req.session.user._id) {
        res.redirect('/login');
    } else {
        next();
    }
}
exports.admin_required = function(req, res, next) {
    if (!req.session.user._id) {
        if(!req.session.user.role != 'admin'){
            res.redirect('/login');
        }else {
            next();
        }
    } else {
        next();
    }
}

exports.resSession = function (req, res, next) {
        res.locals.session = req.session;
        next();
}