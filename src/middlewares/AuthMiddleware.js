import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No se envió Token de autenticación."
            });
        }

        const decoded = jwt.verify(token, 'CLAVE_SUPER_SECRETA_CAMBIAR_LUEGO');

        req.usuario = decoded;
        
        next(); 
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Token Inválido o expirado."
        });
    }
}

export default authMiddleware;