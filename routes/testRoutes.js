import express from 'express'

import { postController,getController } from '../controllers/testController.js'

const router = express.Router()

router.post("/", postController)

router.get("/", getController)

export default router