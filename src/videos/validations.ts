import {ErrorType} from "./types";

export const titleValidation = (title: string | undefined, errors: ErrorType[]) => {
    if (!title) {
        errors.push({message: 'title undefined', field: 'title'})
    }

    if (title && title.trim().length > 30) {
        errors.push({message: 'Incorrect length max 30', field: 'title'})
    }
}
export const authorValidation = (author: string | undefined, errors: ErrorType[]) => {
    if (!author) {
        errors.push({message: 'title undefined', field: 'author'})
    }

    if (author && author.trim().length > 20) {
        errors.push({message: 'Incorrect length max 20', field: 'author'})
    }
}