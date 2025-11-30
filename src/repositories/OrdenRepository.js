import Orden from '../models/Orden.js';
import RepositoryBase from './RepositoryBase.js';
import ItemDeLaOrden from '../models/ItemDeLaOrden.js';
import Producto from '../models/Producto.js';

class OrdenRepository extends RepositoryBase {
  // Devuelve la orden con sus items y datos de producto
  async findDetail(id) {
    try {
      const orden = await Orden.findOne({ where: { id } });
      if (!orden) return null;

      const items = await ItemDeLaOrden.findAll({
        where: { idorden: id }
      });

      const idsProductos = items.map(i => i.idproducto);
      const productos = idsProductos.length
        ? await Producto.findAll({ where: { id: idsProductos } })
        : [];

      const itemsDetallados = items.map(item => {
        const prod = productos.find(p => p.id === item.idproducto);
        return {
          idProducto: item.idproducto,
          cantidad: item.cantidad,
          precioUnitario: item.preciounitario,
          nombre: prod?.nombre,
          imagen: prod?.imagen,
          descripcion: prod?.descripcion
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
  }
}

const ordenRepository = new OrdenRepository(Orden);

export default ordenRepository;