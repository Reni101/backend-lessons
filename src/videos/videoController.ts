import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {BodyType, OutputType, ParamType, QueryType} from "./types";
import {VideoDBType} from "../db/VideoDBType";

export const videoRouter = Router()


export const videoController = {

    getVideos: (req: Request, res: Response,) => {
        res.status(200).json(db.videos);
    },
    createVideo: (req: Request<ParamType, OutputType, BodyType, QueryType>, res: Response) => {


        const newVideo: VideoDBType = {
            ...req.body,
            id: 1,
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
        }
        db.videos.push(newVideo);
        res.status(200).json(db.videos).end();
    },


}

videoRouter.get('/', videoController.getVideos)
videoRouter.post('/', videoController.createVideo)
