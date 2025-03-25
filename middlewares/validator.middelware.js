const validateSchema = (schema) => (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "El cuerpo de la solicitud está vacío" });
        }
        
        const parsedData = schema.parse(req.body);
        req.body = parsedData; // Asegura que los datos sean los validados
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Error de validación",
            errors: error.errors.map(err => err.message),
        });
    }
};

module.exports = validateSchema

