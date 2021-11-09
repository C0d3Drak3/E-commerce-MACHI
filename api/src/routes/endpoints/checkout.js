const app = require('express').Router()
const mercadopago = require('mercadopago');
const { YOUR_ACCESS_TOKEN } = process.env;


mercadopago.configure({
    access_token: YOUR_ACCESS_TOKEN
}); 


app.post('/', (req, res) => {
    // Crea un objeto de preferencia

    //const [ payer, setPayer] = useState({ nombre:"", apellido:"", codigo:"", telefono:"",  codigoPostal:"", calle:"", altura:"",  })    

    let preference = {
         items: [
          {
            //category_id: req.body.id, // 1235641348
            title: req.body.title, // nombre del producto
            unit_price: parseInt(req.body.unit_price),
            quantity: parseInt(req.body.quantity), //esto hay q crearlo
            currency_id: 'ARS'
          }
        ], 
        payer: {
          phone: { area_code: req.body.codigo, number: parseInt(req.body.telefono) },
          address: { zip_code: req.body.codigoPostal, street_name: req.body.calle, street_number: parseInt(req.body.altura) },
          email: req.body.email,
          identification: { number: req.body.codigo, type: req.body.telefono },
          name: req.body.nombre,
          surname: req.body.apellido,
          date_created: null,
          last_purchase: null
        },
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        
        console.log(response.body);
        res.json(response.body.init_point);
       
      }).catch(function(error){
        console.log(error);
      });
    });



module.exports = app;