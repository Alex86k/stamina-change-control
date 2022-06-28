import {StaminaData} from "../dataAccess/stamina.data";
import {setIntervalAsync} from 'set-interval-async/fixed'
import {clearIntervalAsync} from 'set-interval-async'


export class StaminaService {
    private Stamina: StaminaData;

    constructor() {
        this.Stamina = new StaminaData()
    }

    async getStaminaValue(uid: string): Promise<number> {
        return await this.Stamina.getStaminaValue(uid)

    }

    async decreasingStaminaValue(uid: string): Promise<number> {
        let playerData = await this.Stamina.getPlayerData(uid)
        playerData.stamina -= 1

        if (!playerData.isRecoveringNow) {
            await this.recoveryStaminaValue(uid)
        }

        return await this.Stamina.setStaminaValue(uid, playerData.stamina)
    }

    async recoveryStaminaValue(uid: string): Promise<number> {
        const playerDataStart = await this.Stamina.getPlayerData(uid)

        let stamina = playerDataStart.stamina
        const isRecoveringNow = playerDataStart.isRecoveringNow

        if (stamina === 100 || isRecoveringNow) {
            return stamina
        }
        playerDataStart.isRecoveringNow = true
        await this.Stamina.setPlayerData(uid, playerDataStart)

        let timerId = await setIntervalAsync(async () => {
            stamina++
            const playerDataCurrently = await this.Stamina.getPlayerData(uid)

            if (stamina >= playerDataCurrently.stamina) {
                stamina = playerDataCurrently.stamina + 1
            }

            playerDataCurrently.stamina = stamina
            await this.Stamina.setPlayerData(uid, playerDataCurrently)

            if (stamina === 100) {
                playerDataCurrently.isRecoveringNow = false
                await this.Stamina.setPlayerData(uid, playerDataCurrently)
                await clearIntervalAsync(timerId);
                return stamina
            }

        }, 60000)

        return stamina
    }
}