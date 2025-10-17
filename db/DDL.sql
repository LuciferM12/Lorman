-- =====================================================================
--  LORMAN MASTER DATABASE v2025
--  Compatible con PostgreSQL 15 / Supabase
--  Autores: Omar Rodríguez, Evan Pérez, Brian Rivera, Juan Francisco, Guillermo Ochoa
-- =====================================================================

-- #####################################################################
-- ##                       CREACIÓN DE TABLAS                        ##
-- #####################################################################

-- Tabla de usuarios (clientes / administradores)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(20),
    dias_entrega_preferidos VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('cliente', 'administrador')) DEFAULT 'cliente'
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_unitario NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    disponible BOOLEAN NOT NULL DEFAULT TRUE
);

-- Carrito
CREATE TABLE IF NOT EXISTS carrito (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    fecha_ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Detalles del carrito
CREATE TABLE IF NOT EXISTS detalles_carrito (
    id_detalle_carrito SERIAL PRIMARY KEY,
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Promociones
CREATE TABLE IF NOT EXISTS promociones (
    id_promocion SERIAL PRIMARY KEY,
    nombre_promocion VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo_descuento VARCHAR(20) NOT NULL CHECK (tipo_descuento IN ('porcentaje', 'monto_fijo')),
    valor_descuento NUMERIC(10, 2) NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    activa BOOLEAN DEFAULT TRUE
);

-- Relación promoción-producto
CREATE TABLE IF NOT EXISTS promocion_producto (
    id_promocion INT NOT NULL,
    id_producto INT NOT NULL,
    PRIMARY KEY (id_promocion, id_producto),
    FOREIGN KEY (id_promocion) REFERENCES promociones(id_promocion) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    direccion_entrega TEXT NOT NULL,
    monto_total NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    estado_entrega VARCHAR(20) NOT NULL CHECK (estado_entrega IN ('pendiente', 'en_camino', 'entregado', 'cancelado')) DEFAULT 'pendiente',
    FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Detalles de pedido
CREATE TABLE IF NOT EXISTS detalles_pedido (
    id_detalle_pedido SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_al_momento NUMERIC(10, 2) NOT NULL,
    id_promocion_aplicada INT,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_promocion_aplicada) REFERENCES promociones(id_promocion) ON DELETE SET NULL
);

-- Cotizaciones
CREATE TABLE IF NOT EXISTS cotizaciones (
    id_cotizacion SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    nombre_empresa VARCHAR(255),
    notas_generales TEXT,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_cotizacion VARCHAR(20) NOT NULL CHECK (estado_cotizacion IN ('solicitada', 'en_revision', 'aprobada', 'rechazada')) DEFAULT 'solicitada',
    FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Detalles de cotización
CREATE TABLE IF NOT EXISTS detalles_cotizacion (
    id_detalle_cotizacion SERIAL PRIMARY KEY,
    id_cotizacion INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad_solicitada INT NOT NULL,
    notas_personalizacion_producto TEXT,
    FOREIGN KEY (id_cotizacion) REFERENCES cotizaciones(id_cotizacion) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Reseñas
CREATE TABLE IF NOT EXISTS resenas (
    id_resena SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_producto INT,
    calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha_resena TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Preguntas frecuentes
CREATE TABLE IF NOT EXISTS preguntas_frecuentes (
    id_pregunta SERIAL PRIMARY KEY,
    id_cliente_pregunta INT NOT NULL,
    id_admin_respuesta INT,
    pregunta TEXT NOT NULL,
    respuesta TEXT,
    fecha_pregunta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    visible_publicamente BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_cliente_pregunta) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_admin_respuesta) REFERENCES usuarios(id_usuario) ON DELETE SET NULL ON UPDATE CASCADE
);

-- #####################################################################
-- ##                       TRIGGERS / FUNCIONES                     ##
-- #####################################################################

-- Actualiza el stock y disponibilidad después de agregar un producto al pedido
CREATE OR REPLACE FUNCTION actualizar_stock_disponibilidad()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE productos
    SET stock = stock - NEW.cantidad
    WHERE id_producto = NEW.id_producto;

    UPDATE productos
    SET disponible = FALSE
    WHERE id_producto = NEW.id_producto AND stock <= 0;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_after_detalle_pedido_insert
AFTER INSERT ON detalles_pedido
FOR EACH ROW
EXECUTE FUNCTION actualizar_stock_disponibilidad();

-- Actualiza el monto total del pedido después de insertar un detalle
CREATE OR REPLACE FUNCTION actualizar_total_pedido()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pedidos
    SET monto_total = monto_total + (NEW.cantidad * NEW.precio_al_momento)
    WHERE id_pedido = NEW.id_pedido;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_after_detalle_pedido_update_total
AFTER INSERT ON detalles_pedido
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_pedido();

-- #####################################################################
-- ##                         ÍNDICES                                ##
-- #####################################################################

CREATE INDEX IF NOT EXISTS idx_usuario_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos(id_cliente);
CREATE INDEX IF NOT EXISTS idx_producto_nombre ON productos(nombre_producto);
CREATE INDEX IF NOT EXISTS idx_cotizaciones_cliente ON cotizaciones(id_cliente);
CREATE INDEX IF NOT EXISTS idx_preguntas_publicas ON preguntas_frecuentes(visible_publicamente);

-- =====================================================================
--  FIN DEL SCRIPT
-- =====================================================================
