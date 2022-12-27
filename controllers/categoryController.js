const connection = require("../config/db");

class CategoryController{
  //renderiza la página de una categoría y sus productos
  oneCategory = (req,res) => {
    let id = req.params.id;
    let sql = `select * from item where category_id = ${id}`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        res.render("oneCategory", {result});
    })
}
}
module.exports = new CategoryController();