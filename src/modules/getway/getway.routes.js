const router = require("express").Router();
const {GetMicroServices, AddService} = require('./getway.controller');


// make this thing a middleware. and the pass to next incase none is found
// router.all("", async (req, res) => {
// let originalUrl = req.originalUrl.split("/");
// const serviceName = originalUrl[1]
// originalUrl = originalUrl.length > 2 ? originalUrl.slice(start = 2) : ["/"];
// const url = originalUrl.join("/");
// const role = req.headers.authorization ? "await getRole(req) " : null;
// req.headers['role'] = role;
// // console.log(req.headers);
// console.log(role)
// res.send("its done yoo. do it or leave it !" + serviceName);
// })


router.route("/microservices").get(GetMicroServices).post(AddService);
module.exports = router;
