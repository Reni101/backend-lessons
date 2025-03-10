import {ErrorType} from "./types";
import {AvailableResolutions} from "../db/VideoDBType";

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
export const availableResolutionsValidation = (availableResolutions: string[], errors: ErrorType[]) => {
    const isEvery = availableResolutions.every(resolution => {
            // @ts-ignore
            return Object.values(AvailableResolutions).includes(resolution)
        }
    )

    if(!isEvery) {
        errors.push({message: 'error', field: 'availableResolutions'})
    }

}
export const minAgeRestrictionValidation = (age: number, errors: ErrorType[]) => {
    if(age <1) {
        errors.push({message: 'error', field: 'minAgeRestriction'})
    }
    if(age > 18) {
        errors.push({message: 'error', field: 'minAgeRestriction'})
    }

}
export const publicationDateValidation = (date: string, errors: ErrorType[]) => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    if(!regex.test(date)) {
        errors.push({message: 'error', field: 'publicationDate'})
    }

}