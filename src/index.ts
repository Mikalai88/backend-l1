import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {app} from "./setting";


const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})