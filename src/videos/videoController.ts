import {Router,Request,Response} from "express";

export const videoRouter = Router()


export const videoController = {

    getVideos: (req:Request,res:Response) => {
        res.status(200).send('videos1123')
    },
    getVideoById: (req:Request,res:Response) => {
        res.status(200).send('id trstasda')
    }


}

videoRouter.get('/', videoController.getVideos)
videoRouter.get('/:id', videoController.getVideoById)