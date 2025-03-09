import {Request, Response, Router} from "express";
import {db, setDB} from "../db/db";

export const testRouter = Router()


export const testController = {

    clearAllData: (req: Request, res: Response) => {
        if (db.videos.length === 0) {
            res.status(204).end();
        }

        setDB({videos: []})
        res.status(204).end()

    },


}

testRouter.delete('/all-data', testController.clearAllData)

