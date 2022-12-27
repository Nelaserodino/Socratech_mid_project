const connection = require("../config/db");

class IndexController {
    //Render de la página principal con todos los coleccionistas en la base de datos
    allCollectors = (req,res) => {
        let sql = "select * from collector";
        let sql2 = "select * from category";
        connection.query(sql, (error, resultCollectors) => {
            if(error) throw error;
            connection.query(sql2, (error2, resultCategory) => {
                if(error2) throw error2;
                res.render("index", { resultCollectors, resultCategory });
            })
        });
    };
}

module.exports = new IndexController();