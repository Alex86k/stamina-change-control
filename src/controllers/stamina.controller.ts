import {StaminaService} from "../services/stamina.service";
import express from "express";


const Stamina = new StaminaService()

export const getStaminaValue = async (req: express.Request, res: express.Response) => {
    try {
        const {uid} = req.params
        const staminaValue = await Stamina.getStaminaValue(uid)
        res.status(200).json(staminaValue)

    } catch (e) {

        res.status(500).json({message: "SMTHNG_WENT_WRONG",})
    }
}

export const decreasingStaminaValue = async (req: express.Request, res: express.Response) => {
    try {
        const {uid} = req.params
        const stamina = await Stamina.decreasingStaminaValue(uid)
        res.status(200).json(stamina)

    } catch (e) {

        res.status(500).json({message: "SMTHNG_WENT_WRONG",})
    }
}

export const recoveryStaminaValue = async (req: express.Request, res: express.Response) => {
    try {
        const {uid} = req.params
        const staminaValue = await Stamina.recoveryStaminaValue(uid)
        res.status(200).json(staminaValue)

    } catch (e) {

        res.status(500).json({message: "SMTHNG_WENT_WRONG",})
    }
}


