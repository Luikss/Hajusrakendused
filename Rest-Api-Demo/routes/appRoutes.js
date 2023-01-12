module.exports = (app) => {
    require("./widgetsRoutes")(app)
    require("./greetingsRoutes.js")(app)
}
