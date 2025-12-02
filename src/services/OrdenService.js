import ordenRepository from '../repositories/OrdenRepository.js';
import itemDeLaOrdenRepository from '../repositories/ItemDeLaOrdenRepository.js';
import Producto from '../models/Producto.js';

const crearOrden = async (idusuario, items, datosEnvio, metodoPago) => {
  try {

    const subtotal = items.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
    const total = subtotal;

    const nuevaOrden = await ordenRepository.create({
      idusuario,
      subtotal,
      total,
      metododeentrega: metodoPago, 
      direccionenvio: datosEnvio.direccion,
      estado: "pagado"
    });

    for (const item of items) {
      await itemDeLaOrdenRepository.create({
        idorden: nuevaOrden.id,
        idproducto: item.id,
        cantidad: item.cantidad,
        preciounitario: item.precio
      });
    }

    return nuevaOrden;

  } catch (error) {
    console.log(error);
    return null;
  }
};

const obtenerOrdenDetalle = async (id) => {
  try {
    const orden = await ordenRepository.findOne(id);
    if (!orden) return null;

    const items = await itemDeLaOrdenRepository.model.findAll({
      where: { idorden: id }
    });

    const idsProductos = items.map(i => i.idproducto);

    const productos = idsProductos.length
      ? await Producto.findAll({ where: { id: idsProductos } })
      : [];

    const itemsDetallados = items.map(item => {
      const prod = productos.find(p => p.id === item.idproducto);
      return {
        id: item.id,
        idProducto: item.idproducto,
        cantidad: item.cantidad,
        precioUnitario: item.preciounitario,
        nombre: prod?.nombre,
        imagen: prod?.imagen,
        descripcion: prod?.descripcion,
        categoriaNombre: categoria?.nombre 
      };
    });

    return {
      ...orden.dataValues,
      items: itemsDetallados
    };

  } catch (error) {
    console.log(error);
    return null;
  }
};

const ordenService = { crearOrden, obtenerOrdenDetalle };
export default ordenService;
