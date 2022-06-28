import {Router} from "express"
import {staminaController} from "../controllers"


export const router = Router()


router.get("/getStaminaValue/:uid", staminaController.getStaminaValue)
router.put("/decreasingStaminaValue/:uid", staminaController.decreasingStaminaValue)
router.put("/recoveryStaminaValue/:uid", staminaController.recoveryStaminaValue)



