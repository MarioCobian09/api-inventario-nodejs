import { Router } from "express"

import { authenticate } from "../middlewares/auth"

import AuthRoutes from "./Auth.routes"
import UserRoutes from "./Usuario.routes"
import CategoryRoutes from "./Categoria.routes"
import ProductRoutes from "./Producto.routes"
import InventoryRoutes from "./Inventory.routes"

const router = Router()

router.get('/', (req, res) => {
    res.send('API funcionando ⚙️')
})

router.use('/auth', AuthRoutes)

// Middleware para proteger el resto de las rutas
router.use(authenticate)

router.use('/user', UserRoutes)
router.use('/category', CategoryRoutes)
router.use('/product', [ProductRoutes, InventoryRoutes])

export default router