const { Usuario, Carrito, Producto } = require("../db");
const bCrypt = require("bcrypt-nodejs");
const CreadorDeEncriptado = function (contrasenia) {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
};
async function getUsuario(req, res) {
  let users = await Usuario.findAll();

  try {
    if (users) {
      res.json(users);
    } else {
      return res.status(404).send("No hay usuarios existentes.");
    }
  } catch (error) {
    return res.status(404);
  }
}

async function deleteUsuario(req, res) {
  const { id } = req.params;

  let user = await Usuario.findByPk(id);

  Usuario.destroy({
    where: {
      id: id,
    },
  });

  res.json(user);
}

async function putUsuario(req, res) {
  const { id } = req.params;

  const { nombre, apellido, email, contraseña, tipo } = req.body;

  await Usuario.update(
    {
      nombre,
      apellido,
      email,
      contraseña,
      tipo,
    },
    {
      where: { id: id },
    }
  );

  const user = await Usuario.findByPk(id);
  res.json(user);
}

async function postUsuario(req, res) {
  const { nombre, apellido, email, contrasenia } = req.body;

  try {
    if (nombre && apellido && email && contrasenia) {
      const verficadorDeUsuario = await Usuario.findAll({ where: { email } });
      if (verficadorDeUsuario.length === 0) {
        const contraseñaEncriptada = CreadorDeEncriptado(contrasenia);
        const nuevoUsuario = await Usuario.create({
          nombre: nombre,
          apellido: apellido,
          email: email,
          contrasenia: contraseñaEncriptada,
          tipo: "user",
        });
        res.json({ message: "Success" });
      } else {
        res.status(404).json({
          error: "El Correo Ingresado ya Tiene Cuenta Activa en Machi",
        });
      }
    } else {
      res.status(404).json({ error: "Faltan Datos" });
    }
  } catch (error) {
    console.log(error);
    apellidores.json({ error: "this is the error: " + error });
  }
}

async function inicioDeSesion(req, res) {
  const { carritos } = req.body;

  const usuario=req.user
  try {
    if(carritos &&carritos.length){
    const carrito = await Promise.all(
      carritos.map((carrito) => 
        Carrito.findOrCreate({
          where: { idCarrito: carrito.idCarrito },
          defaults: {
            idProducto: carrito.idProducto,
            cantidad: carrito.qty,
            nombre: carrito.nombre,
            precio: carrito.precio,
          },
        }) 
      )
    );
    //const carritoEncontrado= await Carrito.findAll({where:{usuarioId:usuario.id}})
    await usuario.addModels(carrito.flat().map(cart=>cart.idCarrito))
    const usuarioActualizado = await Usuario.findByPk(usuario.id,{include:{model:Carrito}})
    res.json(usuarioActualizado);  
    }
    else{
      console.log("pasor por aca")
      res.json(usuario)
    }
  } catch (e) {
    res.status(401).json({ error: `${e}` });
  }
}

function pedidoCerrarSesion(req, res) {
  req.logout();
  res.json({ message: "Ok" });
}
function inicioFacebook(req, res) {
  const { id, nombre, tipo } = req.user;
  res.json({ message: "autorizado ", id, nombre, tipo });
}

module.exports = {
  getUsuario,
  putUsuario,
  postUsuario,
  deleteUsuario,
  inicioDeSesion,
  pedidoCerrarSesion,
  inicioFacebook,
};
