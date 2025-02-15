import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changetQty,
  removeFromCart,
  CambiarCantidadDb,
  removerDeDb,
} from "../Redux/actions/cartAction";
import { getComentarios } from "../Redux/actions/productAction";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
//import { height } from "@mui/system";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
const CartProduct = ({
  imagen,
  nombre,
  categoria,
  precio,
  descripcion,
  id,
  idProducto,
  usuarioId,
  disponibilidad,
  qty,
}) => {
  const dispatch = useDispatch();
  // console.log("id del producto", idProducto);
  useEffect(() => {
    dispatch(getComentarios(idProducto));
  }, [dispatch, idProducto]);

  const { comments } = useSelector((state) => state.productos);
  // console.log("aca los comentarios", comments);

  let puntuacionMedia = 0;
  comments.forEach((element) => {
    // console.log("las diferentes puntuaciones",element.puntuacion);
    puntuacionMedia += element.puntuacion;
  });
  puntuacionMedia = puntuacionMedia / comments.length;
  // console.log("puntuacion media", puntuacionMedia);
  const cantidadResenias= comments.length;
  // console.log(cantidadResenias);
  const handleOnClick = () => {
    usuarioId ? dispatch(removerDeDb(id)) : dispatch(removeFromCart(id));
  };
  const handleOnQtyIncrement = () => {
    usuarioId
      ? dispatch(CambiarCantidadDb(id, 1))
      : dispatch(changetQty(id, "increment"));
  };
  const handleOnQtyDecrement = () => {
    usuarioId
      ? dispatch(CambiarCantidadDb(id, -1))
      : dispatch(changetQty(id, "decrement"));
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  let precioTotalProducto = precio * qty;
  precioTotalProducto = formatter.format(precioTotalProducto);
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "50%",
        margin: "auto",
        mt: 2,
        marginBottom: "4%",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={imagen}
          alt={nombre}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {nombre}
            </Typography>
            {puntuacionMedia ? (
              <Stack spacing={1}>
                <Rating
                  name="size-small"
                  value={puntuacionMedia}
                  precision={0.2}
                  readOnly
                />
           <Typography
              variant="subtitle2"
              color={"text.secondary"}
              component="div"
            >
              {`${cantidadResenias} calificaciones`}
            </Typography>
                
              </Stack>
            ) : (
            <Typography
              variant="subtitle1"
              color={"text.secondary"}
              component="div"
            >
              {/**aca lo pongo rojito si no esta diponible tambien falta categoria*/}
              {"No hay reseñas disponibles aun"}
            </Typography>
              
            )}

          </CardContent>
          <Button
            onClick={handleOnClick}
            variant="outlined"
            startIcon={<DeleteIcon />}
            sx={{ alignSelf: "center",
            marginBottom: "2%",
            marginLeft:"4%",
           }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "50%",
          border: "1px solid rgba(6,25,38,0.11)",
          borderRadius: "3px",
          alignSelf: "center",
        }}
      >
        <Button onClick={handleOnQtyDecrement}>-</Button>
        <Typography
          variant="subtitle1"
          component="div"
          color={"button.primary"}
        >
          {qty}
        </Typography>
        <Button onClick={handleOnQtyIncrement}>+</Button>
      </Box>
      <Typography
        variant="h4"
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 1,
          pb: 1,
          mr: 7,
          width: 120,
        }}
      >
        {precioTotalProducto}
      </Typography>
    </Card>
  );
};

export default CartProduct;
