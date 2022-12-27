const connection = require("../config/db");
const bcrypt = require("bcrypt");

class CollectorController{

    // Mostrar formulario para registrar coleccionistas
    viewRegisterForm = (req,res) =>{
      res.render("registerForm", { mensaje: "" });
    } 

    // Obtener datos para registrar coleccionistas
    registerCollector = (req,res) => {
      let { collector_name, surname, phone, interests, collection_description, email, password } = req.body;
       
        
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
      
        let sql = `INSERT INTO collector (collector_name, surname, phone, interests, collection_description, email, password) VALUES ('${collector_name}', '${surname}','${phone}','${interests}', '${collection_description}', '${email}', '${hash}')`;

        if (req.file != undefined) {
          let img = req.file.filename;
          sql = `INSERT INTO collector (collector_name, surname, phone, interests, collection_description, email, password, collector_img) VALUES ('${collector_name}', '${surname}','${phone}','${interests}', '${collection_description}', '${email}', '${hash}', '${img}')`;
        }
    
        connection.query(sql, (error, result) => {
          if (error) {
              if (error.code == "ER_DUP_ENTRY") {
                res.render("registerForm", { mensaje: "Account already created!" });
              } else {
                throw error;
              }
            } else {
              res.redirect(`/`);
            }
        });
      });
    }

    //Mostrar página de un coleccionista
    showOneCollector = (req,res) => {
      let id = req.params.id;
      let sql = `Select collector.*, item.* from collector
      left join item on collector.collector_id = item.collector_id where collector.collector_id = ${id}`;
      connection.query(sql, (error, resultOneCollector) =>{
          if (error) throw error;
          let finalResult = {};
          let groupOfCollectibles = [];
          let collectible = {};
          resultOneCollector.forEach((x) => {
              collectible = {
                  item_id: x.item_id,
                  item_name: x.item_name,
                  item_description: x.item_description,
                  price: x.price,
                  item_img: x.item_img,
              };
              if(collectible.item_id != null){
                  groupOfCollectibles.push(collectible);
              }
          });
          finalResult = {
              collector_id:id,
              collector_name: resultOneCollector[0].collector_name,
              surname:resultOneCollector[0].surname,
              interests:resultOneCollector[0].interests,
              email:resultOneCollector[0].email,
              collection_description:resultOneCollector[0].collection_description,
              phone:resultOneCollector[0].phone,
              collector_img:resultOneCollector[0].collector_img,                collectible: groupOfCollectibles,
            }
            res.render("oneCollector", { finalResult });
      });
    }
    
    //Mostrar formulario de login
    viewLoginForm = (req,res) => {
      res.render("login", { message: ""});
    };

    //Recoger los datos del login
    login = (req,res) => {
      let { email, password} = req.body;
      let sql = `SELECT * FROM collector WHERE email = '${email}'`;
      connection.query(sql, (error, resultEmail) => {
        if(error) throw error;
        if (resultEmail.length == 1){
          let pass = resultEmail[0].password;
          bcrypt.compare(password, pass, (err, result) => {
          if(err) throw err;
          if(result){
            res.redirect("/");
          } else {
            res.render("login", { message: "Not a valid user" });
            }
          })
        } else {
          res.render("login", { message: "Not a valid user" });
        }
      })
    }

  //Borrar un coleccionista
  deleteCollector = (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM collector WHERE collector_id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect("/");
    });
  }

  //Renderizar formulario para editar información del coleccionista
  editCollectorForm = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM collector WHERE collector_id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editCollectorForm", { result });
    });
  }

  //Guardar cambios del formulario editado
  saveEditedCollector = (req, res) => {
    let id = req.params.id;
    let { collector_name, surname, phone, interests, collection_description } = req.body;
  
    let sql = `UPDATE collector SET collector_name = '${collector_name}', surname = '${surname}', phone = ${phone}, interests = '${interests}', collection_description = '${collection_description}' WHERE collector_id = ${id}`;
  
    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE collector SET collector_name = '${collector_name}', surname = '${surname}', phone = ${phone}, interests = '${interests}', collection_description = '${collection_description}', collector_img = '${img}' WHERE collector_id = ${id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/collector/oneCollector/${id}`);
    });
  }

}
module.exports = new CollectorController();