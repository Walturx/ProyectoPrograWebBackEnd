import ItemDeCarrito from '../models/ItemDeCarrito.js';
import RepositoryBase from './RepositoryBase.js';

class ItemDeCarritoRepository extends RepositoryBase {
    constructor() {
        super(ItemDeCarrito);
    }

    async findByCarrito(idcarrito) {
        try {
            return await this.model.findAll({
                where: { idcarrito }
            });
        } catch (error) {
            console.log("ERROR findByCarrito:", error);
            return null;
        }
    }
}

const itemCarritoRepository = new ItemDeCarritoRepository();
export default itemCarritoRepository;
