-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-customersdb-2vtip8.endpoints.svc.cluster.local
-- Tiempo de generación: 31-12-2024 a las 16:47:26
-- Versión del servidor: 8.0.26-google
-- Versión de PHP: 8.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `72c8a5c3cf10306ddb4e899fdcbbab62`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Ciclo_Formativo`
--

CREATE TABLE `RYC_Tarifas_Ciclo_Formativo` (
  `ID_Ciclo` int NOT NULL,
  `Nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Grado` enum('Basica','Medio','Superior') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Horas_Totales` int NOT NULL,
  `Modalidad` enum('Presencial','Distancia') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Ciclo_Formativo`
--

INSERT INTO `RYC_Tarifas_Ciclo_Formativo` (`ID_Ciclo`, `Nombre`, `Grado`, `Horas_Totales`, `Modalidad`) VALUES
(19201, 'Cuidados Auxiliares de Enfermería', 'Medio', 2000, 'Distancia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Ciclo_Modulo`
--

CREATE TABLE `RYC_Tarifas_Ciclo_Modulo` (
  `ID_Ciclo` int NOT NULL,
  `ID_Modulo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Ciclo_Modulo`
--

INSERT INTO `RYC_Tarifas_Ciclo_Modulo` (`ID_Ciclo`, `ID_Modulo`) VALUES
(19201, 5448),
(19201, 5449),
(19201, 5450),
(19201, 5451),
(19201, 5452),
(19201, 5453),
(19201, 5455),
(19201, 5456),
(19201, 5457),
(19201, 5458);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Descuento`
--

CREATE TABLE `RYC_Tarifas_Descuento` (
  `ID_Descuento` int NOT NULL,
  `Descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Porcentaje_Descuento` decimal(5,2) NOT NULL,
  `Condiciones` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Descuento`
--

INSERT INTO `RYC_Tarifas_Descuento` (`ID_Descuento`, `Descripcion`, `Porcentaje_Descuento`, `Condiciones`) VALUES
(1, 'Antiguo Alumno', 50.00, 'Antiguo Alumno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Incremento`
--

CREATE TABLE `RYC_Tarifas_Incremento` (
  `ID_Incremento` int NOT NULL,
  `Descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Porcentaje_Incremento` decimal(5,2) NOT NULL,
  `Condiciones` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Incremento`
--

INSERT INTO `RYC_Tarifas_Incremento` (`ID_Incremento`, `Descripcion`, `Porcentaje_Incremento`, `Condiciones`) VALUES
(1, 'Pago Aplazado', 9.80, 'Precio Pago Aplazado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Modulo`
--

CREATE TABLE `RYC_Tarifas_Modulo` (
  `ID_Modulo` int NOT NULL,
  `Nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `Horas_Asignadas` int NOT NULL,
  `Precio_Hora_Matricula` decimal(10,2) NOT NULL,
  `Precio_Hora_Matricula_Aplazado` decimal(10,2) NOT NULL,
  `Precio_Hora_Convalidacion` decimal(10,3) NOT NULL,
  `Precio_Hora_Convalidacion_Aplazado` decimal(10,2) NOT NULL,
  `Precio_Hora_Matricula_Antiguo_Alumno` decimal(10,3) NOT NULL,
  `Precio_Hora_Matricula_Antiguo_Alumno_Aplazado` decimal(10,2) NOT NULL,
  `Precio_Hora_Convalidacion_Antiguo_Alumno` decimal(10,4) NOT NULL,
  `Precio_Hora_Convalidacion_Antiguo_Alumno_Aplazado` decimal(10,2) NOT NULL,
  `Curso` enum('1','2') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Modulo`
--

INSERT INTO `RYC_Tarifas_Modulo` (`ID_Modulo`, `Nombre`, `Horas_Asignadas`, `Precio_Hora_Matricula`, `Precio_Hora_Matricula_Aplazado`, `Precio_Hora_Convalidacion`, `Precio_Hora_Convalidacion_Aplazado`, `Precio_Hora_Matricula_Antiguo_Alumno`, `Precio_Hora_Matricula_Antiguo_Alumno_Aplazado`, `Precio_Hora_Convalidacion_Antiguo_Alumno`, `Precio_Hora_Convalidacion_Antiguo_Alumno_Aplazado`, `Curso`) VALUES
(5448, 'Operaciones Administrativas y Documentación Sanitaria', 64, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '1'),
(5449, 'Técnicas Básicas de Enfermería', 384, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '1'),
(5450, 'Higiene del Medio Hospitalario y Limpieza del Material', 160, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '1'),
(5451, 'Promoción de la Salud y Apoyo Psicológico al Paciente', 96, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '1'),
(5452, 'El sector de la Sanidad en Andalucía', 32, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '1'),
(5453, 'Relaciones en el Equipo del Trabajo', 64, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '1'),
(5455, 'Proyecto Integrado CAE', 60, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '2'),
(5456, 'Formación en Centros de Trabajo (F.C.T.)', 380, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '2'),
(5457, 'Técnicas de Ayuda Odontológica/Estomatológica', 96, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '1'),
(5458, 'Formación y Orientación Laboral (F.O.L.)', 64, 2.55, 2.80, 1.275, 1.40, 2.295, 2.52, 1.1475, 1.26, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Numero_Cuenta`
--

CREATE TABLE `RYC_Tarifas_Numero_Cuenta` (
  `ID_Banco` int NOT NULL,
  `Iban` varchar(34) NOT NULL,
  `Entidad` varchar(10) NOT NULL,
  `Oficina` varchar(10) NOT NULL,
  `DC` char(2) NOT NULL,
  `Numero_Cuenta` varchar(20) NOT NULL,
  `Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Numero_Cuenta`
--

INSERT INTO `RYC_Tarifas_Numero_Cuenta` (`ID_Banco`, `Iban`, `Entidad`, `Oficina`, `DC`, `Numero_Cuenta`, `Descripcion`) VALUES
(1, 'ES29', '0237', '0152', '80', '9155093051', 'Cajasur');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Otros_Costes`
--

CREATE TABLE `RYC_Tarifas_Otros_Costes` (
  `ID_Otros_Costes` int NOT NULL,
  `Coste` decimal(10,0) NOT NULL,
  `Descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Otros_Costes`
--

INSERT INTO `RYC_Tarifas_Otros_Costes` (`ID_Otros_Costes`, `Coste`, `Descripcion`) VALUES
(1, 200, 'Preinscripción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Pago_Aplazado_Mensualidades`
--

CREATE TABLE `RYC_Tarifas_Pago_Aplazado_Mensualidades` (
  `ID_Mensualidades` int NOT NULL,
  `Numero_Mensualidades` int NOT NULL,
  `Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Rango_Mensualidades` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Fecha_Segundo_Pago` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Pago_Aplazado_Mensualidades`
--

INSERT INTO `RYC_Tarifas_Pago_Aplazado_Mensualidades` (`ID_Mensualidades`, `Numero_Mensualidades`, `Descripcion`, `Rango_Mensualidades`, `Fecha_Segundo_Pago`) VALUES
(1, 8, 'Mensualidades para primer curso', 'octumbre - mayo', '05/01'),
(2, 6, 'Mensualidades para segundo curso', 'octubre - marzo', '05/01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RYC_Tarifas_Pago_Aplazado_Porcentajes`
--

CREATE TABLE `RYC_Tarifas_Pago_Aplazado_Porcentajes` (
  `ID_Porcentaje` int NOT NULL,
  `Porcentaje` int NOT NULL,
  `Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `RYC_Tarifas_Pago_Aplazado_Porcentajes`
--

INSERT INTO `RYC_Tarifas_Pago_Aplazado_Porcentajes` (`ID_Porcentaje`, `Porcentaje`, `Descripcion`) VALUES
(1, 30, 'Porcentaje primer pago para pago aplazado'),
(2, 70, 'Porcentaje resto de pagos para pago aplazado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `RYC_Tarifas_Ciclo_Formativo`
--
ALTER TABLE `RYC_Tarifas_Ciclo_Formativo`
  ADD PRIMARY KEY (`ID_Ciclo`);

--
-- Indices de la tabla `RYC_Tarifas_Ciclo_Modulo`
--
ALTER TABLE `RYC_Tarifas_Ciclo_Modulo`
  ADD PRIMARY KEY (`ID_Ciclo`,`ID_Modulo`),
  ADD KEY `ID_Modulo` (`ID_Modulo`);

--
-- Indices de la tabla `RYC_Tarifas_Descuento`
--
ALTER TABLE `RYC_Tarifas_Descuento`
  ADD PRIMARY KEY (`ID_Descuento`);

--
-- Indices de la tabla `RYC_Tarifas_Incremento`
--
ALTER TABLE `RYC_Tarifas_Incremento`
  ADD PRIMARY KEY (`ID_Incremento`);

--
-- Indices de la tabla `RYC_Tarifas_Modulo`
--
ALTER TABLE `RYC_Tarifas_Modulo`
  ADD PRIMARY KEY (`ID_Modulo`);

--
-- Indices de la tabla `RYC_Tarifas_Numero_Cuenta`
--
ALTER TABLE `RYC_Tarifas_Numero_Cuenta`
  ADD PRIMARY KEY (`ID_Banco`);

--
-- Indices de la tabla `RYC_Tarifas_Otros_Costes`
--
ALTER TABLE `RYC_Tarifas_Otros_Costes`
  ADD PRIMARY KEY (`ID_Otros_Costes`);

--
-- Indices de la tabla `RYC_Tarifas_Pago_Aplazado_Mensualidades`
--
ALTER TABLE `RYC_Tarifas_Pago_Aplazado_Mensualidades`
  ADD PRIMARY KEY (`ID_Mensualidades`);

--
-- Indices de la tabla `RYC_Tarifas_Pago_Aplazado_Porcentajes`
--
ALTER TABLE `RYC_Tarifas_Pago_Aplazado_Porcentajes`
  ADD PRIMARY KEY (`ID_Porcentaje`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `RYC_Tarifas_Numero_Cuenta`
--
ALTER TABLE `RYC_Tarifas_Numero_Cuenta`
  MODIFY `ID_Banco` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `RYC_Tarifas_Otros_Costes`
--
ALTER TABLE `RYC_Tarifas_Otros_Costes`
  MODIFY `ID_Otros_Costes` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `RYC_Tarifas_Pago_Aplazado_Mensualidades`
--
ALTER TABLE `RYC_Tarifas_Pago_Aplazado_Mensualidades`
  MODIFY `ID_Mensualidades` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `RYC_Tarifas_Pago_Aplazado_Porcentajes`
--
ALTER TABLE `RYC_Tarifas_Pago_Aplazado_Porcentajes`
  MODIFY `ID_Porcentaje` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `RYC_Tarifas_Ciclo_Modulo`
--
ALTER TABLE `RYC_Tarifas_Ciclo_Modulo`
  ADD CONSTRAINT `RYC_Tarifas_Ciclo_Modulo_ibfk_1` FOREIGN KEY (`ID_Ciclo`) REFERENCES `RYC_Tarifas_Ciclo_Formativo` (`ID_Ciclo`) ON DELETE CASCADE,
  ADD CONSTRAINT `RYC_Tarifas_Ciclo_Modulo_ibfk_2` FOREIGN KEY (`ID_Modulo`) REFERENCES `RYC_Tarifas_Modulo` (`ID_Modulo`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
