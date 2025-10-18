ALTER TABLE preguntas_frecuentes 
DROP COLUMN IF EXISTS id_cliente_pregunta,
DROP COLUMN IF EXISTS id_admin_respuesta,
DROP COLUMN IF EXISTS fecha_pregunta,
DROP COLUMN IF EXISTS fecha_respuesta;