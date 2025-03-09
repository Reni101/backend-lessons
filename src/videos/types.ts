import {AvailableResolutions} from "../db/VideoDBType";

export type ParamType = {
    id: string
}

export type NewVideoBodyType = {
    title: string
    author: string
    availableResolutions: AvailableResolutions[]
}

export type QueryType = {
    search?: string
}

export type OutputType = void

export type ErrorType = {
    message: string
    field: string
}



//
// export const someController = (
//     req: Request<ParamType, OutputType, BodyType, QueryType>,
//     res: Response<OutputType>
// ) => {
//
// }