import './dotenv.js'
import pool from './database.js'
import fileUrlToPath from url
import path, {dirname} from path
import fs from 'fs'

const currentPath = fileUrlToPath(import.meta.url)
const tripsFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'))
const tripsData = JSON.parse(tripsFile)