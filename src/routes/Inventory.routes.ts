import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import InventoryController from "../controllers/Inventory.controller";

const router = Router()


// Entrada stock
router.post("/:id/add",
    param("id").isString(),
    body("cantidad").isNumeric(),
    handleInputErrors,
    InventoryController.addStock
)

// Salida stock
router.post("/:id/remove",
    param("id").isString(),
    body("cantidad").isNumeric(),
    handleInputErrors,
    InventoryController.removeStock
)

// Obtener movimientos de producto
router.get("/:id/movements",
    param("id").isString(),
    handleInputErrors,
    InventoryController.getMovements
)

export default router