import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'
import {AvailableResolutions} from "../src/db/VideoDBType";
import {NewVideoBodyType} from "../src/videos/types";
import {setDB} from "./datasets";

describe('/videos', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()
    })

    it('should return array videos', async () => {
        // setDB() // очистка базы данных если нужно

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)
        expect(res.body.length).toBe(0)
        expect(Array.isArray(res.body)).toBe(true);
    })
    it('should return videos + new video', async () => {

        const data: NewVideoBodyType = {
            title: 'asd',
            author: "string",
            availableResolutions: [AvailableResolutions.P144]
        }

        await req.post(SETTINGS.PATH.VIDEOS).send(data)
            .expect(200)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)
        expect(res.body.length).toBe(1);

    })
    it('should return video by id', async () => {

        const data: NewVideoBodyType = {
            title: 'asd',
            author: "string",
            availableResolutions: [AvailableResolutions.P144]
        }

        await req.post(SETTINGS.PATH.VIDEOS).send(data)
            .expect(200)

        // const res2 = await req.get(SETTINGS.PATH.VIDEOS + `/${res.body.id}`).expect(200)
        await req.get(SETTINGS.PATH.VIDEOS + `/1`).expect(204)

    })

})