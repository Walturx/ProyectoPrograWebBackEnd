import CarritoDeCompra from '../models/CarritoDeCompra.js';
import RepositoryBase from './RepositoryBase.js';

class CarritoDeCompraRepository extends RepositoryBase {
    constructor() {
        super(CarritoDeCompra);
    }

    async findByUsuario(idusuario) {
        try {
            return await this.model.findOne({
                where: { idusuario }
            });
        } catch (error) {
            console.log("ERROR findByUsuario:", error);
            return null;
        }
    }
}

const carritoRepository = new CarritoDeCompraRepository();
export default carritoRepository;
