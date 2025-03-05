import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {NewVideoBodyType, OutputType, ParamType, QueryType} from "./types";
import {VideoDBType} from "../db/VideoDBType";

export const videoRouter = Router()


export const videoController = {

    getVideos: (req: Request, res: Response,) => {
        res.status(200).json(db.videos);
    },
    createVideo: (req: Request<ParamType, OutputType, NewVideoBodyType, QueryType>, res: Response) => {
        const newVideo: VideoDBType = {
            ...req.body,
            id: Math.floor(Date.now() / 1000),
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
        }
        db.videos.push(newVideo);
        res.status(200).json(newVideo).end();
    },

    getVideoById: (req: Request, res: Response) => {

        if (req.params.id) {
            const id = req.params.id
            const video = db.videos.find(v => v.id === +id)
            if (!video) {
                res.status(204).end()
            }

            res.status(200).json(video).end()

        } else {
            res.status(400).end()
        }


    }


}

videoRouter.get('/', videoController.getVideos)
videoRouter.post('/', videoController.createVideo)
videoRouter.get('/:id', videoController.getVideoById)
