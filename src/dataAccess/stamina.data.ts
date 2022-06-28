import fs from 'fs'
import IDatabase from "../interface/IDatabase";
import path from "path";
import IPlayerData from "../interface/IPlayerData";

export class StaminaData {
    private readonly file: string;

    constructor() {
        this.file = path.resolve('src/db', 'db.json')
    }


    async getDbData() {
        const data: IDatabase = JSON.parse(await fs.promises.readFile(this.file, 'utf8'));

        return data
    }

    async getStaminaValue(uid: string): Promise<number> {
        const data: IDatabase = await this.getDbData()
        return data[uid].stamina
    }

    async setStaminaValue(uid: string, stamina: number): Promise<number> {

        const data: IDatabase = await this.getDbData()
        data[uid].stamina = stamina
        await fs.promises.writeFile(this.file, JSON.stringify(data));

        return data[uid].stamina
    }

    async getPlayerData(uid: string): Promise<IPlayerData> {
        const data: IDatabase = await this.getDbData()

        return data[uid]
    }

    async setPlayerData(uid: string, playerData: IPlayerData): Promise<IPlayerData> {
        const data: IDatabase = await this.getDbData()
        data[uid] = playerData
        await fs.promises.writeFile(this.file, JSON.stringify(data));

        return playerData
    }


}