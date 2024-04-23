const { NODE_ENV } = process.env
import { ENVIROMENT } from "./constants"

export const envResolver = {
    isLocal: NODE_ENV === ENVIROMENT.LOCAL
}

export default envResolver
