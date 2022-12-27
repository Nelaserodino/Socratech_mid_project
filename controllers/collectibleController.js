const connection = require("../config/db");


class CollectibleController {
  //  Formulario para crear el coleccionable
  createCollectibleForm = (req, res) => {
    let id = req.params.id;
    let sql = `select * from category`;
    connection.query(sql,(error, resultCategory) => {
      if(error) throw error;
      res.render("addCollectible", { id, resultCategory });
    })   
  };

  //Recoger y guardar los datos del coleccionable
  addCollectible = (req,res) => {
    let { item_name, item_description, price, id, category_id } = req.body;
   
    let sql = `INSERT INTO item (item_name, item_description, price, collector_id, category_id) VALUES ('${item_name}', '${item_description}',${price}, ${id}, ${category_id})`;
    if (req.file != undefined) {
        let img = req.file.filename;
        sql = `INSERT INTO item (item_name, item_description, price, collector_id,category_id, item_img) VALUES ('${item_name}', '${item_description}', ${price}, ${id} ,${category_id},'${img}')`;
      } 
      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect(`/collector/oneCollector/${id}`);
      });
  }

  //Mostrar formulario para editar el objeto coleccionable
  viewCollectibleEditForm = (req,res) => {
    let collectible_id = req.params.collectible_id;
    let sql = `SELECT * FROM item WHERE item_id = ${collectible_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editCollectible", { result });
    });
  }

  //guardar los cambios realizados en la edición de datos
  editCollectible = (req,res) => {
  
    let { collectible_id, collector_id } = req.params;
    
    let { item_name, item_description, price } = req.body;
  

   let sql = `UPDATE item SET item_name = '${item_name}', item_description ='${item_description}', price = ${price} WHERE item_id = ${collectible_id}`;

   if(req.file != undefined){
    let img = req.file.filename;
    sql = `UPDATE item SET item_name = '${item_name}', item_description ='${item_description}', price = ${price}, item_img = '${img}' WHERE item_id = ${collectible_id}`;
   }

   connection.query(sql, (error,result) => {
    if(error) throw error;
    res.redirect(`/collector/oneCollector/${collector_id}`);
   })
  }

  //Borrar el objeto coleccionable
  deleteCollectible = (req,res) =>{
    let { collectible_id, collector_id } = req.params;
    let sql = `DELETE from item WHERE item_id = ${collectible_id}`;
    connection.query(sql, (error, result) => {
      if(error) throw error;
      res.redirect(`/collector/oneCollector/${collector_id}`)
    })
  }

  //Agregar objeto de coleccion desde el navbar
  navAddCollectible = (req,res) => {
    let sql = `SELECT collector_id, collector_name FROM collector`;
    let sql2 = 'SELECT * from category';
    connection.query(sql, (error1, resultCollector) => {
      if(error1) throw error1;
      connection.query(sql2,(error2, resultCategory)=>{
        res.render("navAddCollectible", { resultCollector, resultCategory});
      })
      
    })
  }
  showAllCollectibles = (req,res) => {
    let sql = `SELECT * from item order by category_id`;
    connection.query(sql, (error, resultCollectibles) => {
      if(error) throw error;
      res.render("allCollectibles", { resultCollectibles});
    })
  }

}
module.exports = new CollectibleController();