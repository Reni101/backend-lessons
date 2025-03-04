import express, {Request, Response} from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {testRouter} from "./test/testController";
import {videoRouter} from "./videos/videoController";

export const app = express()
app.use(express.json())
app.use(cors())


app.delete('/testing/all-data',  (req: Request, res: Response) => {
    res.status(200).json({asd:'asd'})
})

app.use(SETTINGS.PATH.VIDEOS, videoRouter)
app.use(SETTINGS.PATH.TEST, testRouter)