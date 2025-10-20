ALTER TABLE preguntas_frecuentes 
DROP COLUMN IF EXISTS id_cliente_pregunta,
DROP COLUMN IF EXISTS id_admin_respuesta,
DROP COLUMN IF EXISTS fecha_pregunta,
DROP COLUMN IF EXISTS fecha_respuesta;


CREATE TABLE formulario_contacto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    pedido VARCHAR(100) NULL, 
    asunto VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
);