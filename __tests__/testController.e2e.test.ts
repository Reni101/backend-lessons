import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'

describe('/testing', () => {
    // beforeAll(async () => { // очистка базы данных перед началом тестирования
    //     setDB()
    // })

    it('should return 204', async () => {
        // setDB() // очистка базы данных если нужно

        const res = await req
            .delete(SETTINGS.PATH.TEST + '/all-data',)
            .expect(204)
        expect(res.body).toEqual({})
    })

})