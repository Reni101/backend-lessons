import {config} from 'dotenv'

config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/hometask_01/api/videos',
        TEST: '/hometask_01/api/testing',
    },
}