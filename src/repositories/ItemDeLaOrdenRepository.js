import ItemDeLaOrden from '../models/ItemDeLaOrden.js';
import RepositoryBase from './RepositoryBase.js';

class ItemDeLaOrdenRepository extends RepositoryBase {
    constructor() {
        super(ItemDeLaOrden);
    }

    async findByOrden(idorden) {
        try {
            return await this.model.findAll({
                where: { idorden }
            });
        } catch (error) {
            console.log("ERROR findByOrden:", error);
            return null;
        }
    }
}

const itemOrdenRepository = new ItemDeLaOrdenRepository();
export default itemOrdenRepository;
