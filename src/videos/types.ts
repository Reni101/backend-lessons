import {AvailableResolutions} from "../db/VideoDBType";

export type ParamType = {
    id: string
}

export type BodyType = {
    title: string
    author: string
    availableResolutions: AvailableResolutions[]
}

export type QueryType = {
    search?: string
}

export type OutputType = void

//
// export const someController = (
//     req: Request<ParamType, OutputType, BodyType, QueryType>,
//     res: Response<OutputType>
// ) => {
//
// }