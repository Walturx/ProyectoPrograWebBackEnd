import Usuario from "../models/Usuario.js";
import RepositoryBase from "./RepositoryBase.js";

const usuarioRepository = new RepositoryBase(Usuario);

export default usuarioRepository;
