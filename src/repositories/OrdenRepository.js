import Orden from '../models/Orden.js';
import RepositoryBase from './RepositoryBase.js';
import ItemDeLaOrden from '../models/ItemDeLaOrden.js';
import Producto from '../models/Producto.js';
import Categoria from '../models/Categoria.js'; // 👈 IMPORTANTE

class OrdenRepository extends RepositoryBase {
  constructor() {
    super(Orden);
  }

  async findByUsuario(idusuario) {
    try {
      return await Orden.findAll({
        where: { idusuario: idusuario },
        order: [['fecha', 'DESC']] // Ordenar: las más recientes primero
      });
    } catch (error) {
      console.error("Error al buscar órdenes por usuario:", error);
      return null;
    }
  }

  async findDetail(id) {
    try {
      const orden = await Orden.findOne({ where: { id } });
      if (!orden) return null;

      // Items de la orden
      const items = await ItemDeLaOrden.findAll({
        where: { idorden: id }
      });

      if (!items.length) {
        return {
          ...orden.dataValues,
          items: []
        };
      }

      // Productos relacionados
      const idsProductos = items.map(i => i.idproducto);
      const productos = await Producto.findAll({
        where: { id: idsProductos }
      });

      // Categorías relacionadas
      const idsCategorias = [
        ...new Set(
          productos.map(p => p.idcategoria ?? p.idCategoria).filter(Boolean)
        )
      ];

      let categorias = [];
      if (idsCategorias.length) {
        categorias = await Categoria.findAll({
          where: { id: idsCategorias }
        });
      }

      const itemsDetallados = items.map(item => {
        const prod = productos.find(p => p.id === item.idproducto);

        const idCategoria =
          prod?.idcategoria ??
          prod?.idCategoria ??
          null;

        const categoria = categorias.find(c => c.id === idCategoria);

        return {
          idProducto: item.idproducto,
          cantidad: item.cantidad,
          precioUnitario: item.preciounitario,
          nombre: prod?.nombre,
          imagen: prod?.imagen,
          descripcion: prod?.descripcion,
          categoriaId: idCategoria,
          categoriaNombre: categoria?.nombre ?? null
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

const ordenRepository = new OrdenRepository();

export default ordenRepository;
