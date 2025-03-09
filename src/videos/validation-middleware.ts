import {body} from "express-validator";
import {AvailableResolutions} from "../db/VideoDBType";


export const title=body('title')
    .isLength({min:1, max:30});

export const validateResolutions = [
    body('resolutions')
        .isArray()
        .withMessage('Resolutions must be an array')
        .custom((resolutions:any[]) => {
            const isValid = resolutions.every(res => Object.values(AvailableResolutions).includes(res));
            const hasAtLeastOne = resolutions.some(res => Object.values(AvailableResolutions).includes(res));
            if (!isValid) {
                throw new Error('All resolutions must be one of the available resolutions');
            }
            if (!hasAtLeastOne) {
                throw new Error('At least one resolution must be provided');
            }
            return true;
        })
];