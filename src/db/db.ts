import {VideoDBType} from "./VideoDBType";

export type DBType = {
    videos: VideoDBType[]

}

export const db: DBType = {
    videos: [],

}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos = []
        return
    }
    db.videos = dataset.videos || db.videos
}