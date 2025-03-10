import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {ErrorType, NewVideoBodyType, OutputType, ParamType, QueryType} from "./types";
import {VideoDBType} from "../db/VideoDBType";
import {authorValidation, titleValidation} from "./validations";


export const videoRouter = Router()


export const videoController = {

    getVideos: (req: Request, res: Response,) => {
        res.status(200).json(db.videos);
    },
    createVideo: (req: Request<ParamType, OutputType, NewVideoBodyType, QueryType>, res: Response) => {
        const errorsMessages: ErrorType[] = []
        titleValidation(req.body.title, errorsMessages)
        authorValidation(req.body.author, errorsMessages)
        if (errorsMessages.length > 0) {
            res.status(400).json({errorsMessages}).end()
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
        return;
    },

    getVideoById: (req: Request, res: Response) => {

        if (req.params.id) {
            const id = +req.params.id
            const video = db.videos.find(v => v.id === id)
            if (video) {
                res.status(200).json(video).end()
            } else {
                res.status(404).end()
            }

        } else {
            res.status(404).end()

        }

    },

    updateVideo: (req: Request, res: Response) => {
        if (req.params.id) {
            const errorsMessages: ErrorType[] = []
            titleValidation(req.body.title, errorsMessages)
            authorValidation(req.body.author, errorsMessages)
            if (req.body.canBeDownloaded !== typeof 'boolean') {
                errorsMessages.push({message: 'not boolean', field: 'canBeDownloaded'})
            }

            if (errorsMessages.length > 0) {
                res.status(400).json({errors: errorsMessages}).end()
                return
            }

            const id = req.params.id
            const index = db.videos.findIndex(v => v.id === +id)
            if (index > -1) {
                const video = db.videos[index]

                if (req.body.author) {
                    video.author = req.body.author
                }
                if (req.body.title) {
                    video.title = req.body.title
                }
                if (req.body.availableResolutions) {
                    video.availableResolutions = req.body.availableResolutions
                }
                if (req.body.canBeDownloaded) {
                    video.canBeDownloaded = req.body.canBeDownloaded
                }
                if (req.body.publicationDate) {
                    video.publicationDate = req.body.publicationDate
                }
                if (req.body.minAgeRestriction) {
                    video.minAgeRestriction = req.body.minAgeRestriction
                }

                res.status(204).end()
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
                return;
            } else {
                res.status(404).end()
                return
            }
        } else {
            res.status(404).end()
            return

        }

    }


}

videoRouter.get('/', videoController.getVideos)
videoRouter.post('/', videoController.createVideo)
videoRouter.get('/:id', videoController.getVideoById)
videoRouter.put('/:id', videoController.updateVideo)
videoRouter.delete('/:id', videoController.deleteVideo)
