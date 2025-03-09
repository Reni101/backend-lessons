import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {ErrorType, NewVideoBodyType, OutputType, ParamType, QueryType} from "./types";
import {VideoDBType} from "../db/VideoDBType";
import {titleValidation} from "./validations";


export const videoRouter = Router()


export const videoController = {

    getVideos: (req: Request, res: Response,) => {
        res.status(200).json(db.videos);
    },
    createVideo: (req: Request<ParamType, OutputType, NewVideoBodyType, QueryType>, res: Response) => {
        const errorsMessages: ErrorType[] = []
        titleValidation(req.body.title, errorsMessages)
        if (errorsMessages.length > 0) {
            res.status(400).json({errors: errorsMessages}).end()
            return
        }

        const today = new Date()

        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);

        const newVideo: VideoDBType = {
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            title: req.body.title,
            id: Math.floor(Date.now() / 1000),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: today.toISOString(),
            publicationDate: nextDay.toISOString(),
        }
        db.videos.push(newVideo);
        res.status(201).json(newVideo).end();
    },

    getVideoById: (req: Request, res: Response) => {

        if (req.params.id) {
            const id = req.params.id
            const video = db.videos.find(v => v.id === +id)
            if (!video) {
                res.status(404).end()
            } else {
                db.videos = db.videos.filter(v => v.id !== +id)
                res.status(200).end()
            }

        } else {
            res.status(404).end()
        }

    },

    updateVideo: (req: Request, res: Response) => {
        if (req.params.id) {
            const id = req.params.id
            const index = db.videos.findIndex(v => v.id === +id)
            if (index > -1) {
                const video = db.videos[index]
                const errorsMessages: ErrorType[] = []
                titleValidation(req.body.title, errorsMessages)
                if (errorsMessages.length > 0) {
                    res.status(400).json({errors: errorsMessages}).end()
                    return
                }

                video.author = req.body.author
                video.title = req.body.title
                video.availableResolutions = req.body.availableResolutions,
                    video.canBeDownloaded = req.body.canBeDownloaded,
                    video.createdAt = req.body.createdAt,
                    video.publicationDate = req.body.publicationDate,
                    video.minAgeRestriction = req.body.minAgeRestriction


                res.status(204).json(video).end()
                return
            }
            res.status(404).end()
            return
        }
        res.status(404).end()
    },
    deleteVideo: (req: Request, res: Response) => {
        if (req.params.id) {
            const id = req.params.id
            const index = db.videos.findIndex(v => v.id === +id)
            if (index > -1) {
                db.videos.splice(index, 1)
                res.status(204).end()
            }
            res.status(404).end()
            return
        }
        res.status(404).end()
        return;
    }


}

videoRouter.get('/', videoController.getVideos)
videoRouter.post('/', videoController.createVideo)
videoRouter.get('/:id', videoController.getVideoById)
videoRouter.put('/:id', videoController.updateVideo)
videoRouter.delete('/:id', videoController.deleteVideo)
