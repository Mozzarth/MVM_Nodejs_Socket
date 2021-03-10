import {Request, Response, Router} from 'express'

const indexRouter = Router()

indexRouter.get("",(req:Request,res:Response)=>{
    return res.send("Welcome MVM")
})


export { indexRouter }