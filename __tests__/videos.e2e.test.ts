import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'

describe('/videos', () => {
    // beforeAll(async () => { // очистка базы данных перед началом тестирования
    //     setDB()
    // })

    it('should return array videos', async () => {
        // setDB() // очистка базы данных если нужно

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)
        expect(res.body.length).toBe(0)
        expect(Array.isArray(res.body)).toBe(true);
    })

})