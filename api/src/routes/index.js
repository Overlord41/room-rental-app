const { Router } = require("express")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const PropertyRoutes = require("./PropertyRoutes")
const rentalRoutes = require("./rentalRoutes")
const userRouter = require("./userRoutes")

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/properties", PropertyRoutes)
router.use("/rentals", rentalRoutes)
router.use("/users", userRouter)


module.exports = router
