import express, {Request, Response} from "express";
import bodyParser from "body-parser";

export const app = express()

export enum CodeResponsesEnum {
    Incorrect_values_400 = 400,
    Not_found_404 = 404,
    Not_content_204 = 204
}

export enum Resolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}

export type VideoType = {
    id: number
    title: string
    author: string
    canBeDownloaded?: true
    minAgeRestriction?: number
    createdAt?: string
    publicationDate?: string
    availableResolutions?: Array<Resolutions>
}

let videos: VideoType[] = []

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/videos', (req: Request, res: Response) => {
    // if (req.query.title) {
    //     let searchString = req.query.title.toString();
    //     res.send(products.filter(p => p.title.includes(searchString)))
    // } else {
    res.status(200).send(videos)
    // }
})
app.post('/videos', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || !title.trim() || title.length > 40 || typeof (title
    ) !== "string") {
        res.status(CodeResponsesEnum.Incorrect_values_400).send({
            "errorsMessages": [{
                "message": "title is required",
                "field": "title"
            }]
        })
        return
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
app.put('/videos/:videoId', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || !title.trim() || title.length > 40 || typeof (title
    ) !== "string") {
        res.status(400).send({
            "errorsMessages": [{
                "message": "Incorrect title",
                "field": "title"
            }]
        })
        return
    }

    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        video.title = title
        res.status(204).send(video)
    } else {
        res.sendStatus(404)
    }
})
app.get('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)

    if (video) {
        res.status(200).send(video)
    } else {
        res.sendStatus(404)
    }
})
app.put('/videos/:id', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || !title.trim() || title.length > 40 || typeof (title) !== "string") {
        res.status(400).send({
            "errorsMessages": [{
                "message": "Incorrect title",
                "field": "title"
            }]
        })
        return
    }

    let author = req.body.author
    if (!author || !author.trim() || author.length > 20 || typeof (author
    ) !== "string") {
        res.status(400).send({
            "errorsMessages": [{
                "message": "Incorrect author",
                "field": "author"
            }],
            resultCode: 1
        })
        return
    }

    let availableResolutions = req.body.availableResolutions
    if (!availableResolutions) {
        res.status(400).send({
            "errorsMessages": [{
                "message": "Incorrect availableResolutions",
                "field": "availableResolutions"
            }],
            resultCode: 1
        })
        return
    }

    let minAgeRestriction = req.body.minAgeRestriction
    if (minAgeRestriction === null || typeof(minAgeRestriction) !== "number" || (minAgeRestriction < 1 && minAgeRestriction > 18)) {
        res.status(400).send({
            "errorsMessages": [{
                "message": "Incorrect availableResolutions",
                "field": "availableResolutions"
            }],
            resultCode: 1
        })
        return
    }

    let video = videos.find(v => v.id === +req.params.id)
    if (video) {
        video.title = req.body.title
        video.author = req.body.author
        video.availableResolutions = [Resolutions.P144]
        video.canBeDownloaded = true
        video.minAgeRestriction = 18
        video.publicationDate = "2023-11-11T18:52:12.809Z"
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})
app.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.sendStatus(204)
            return;
        }
    }
    res.sendStatus(404)
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.sendStatus(CodeResponsesEnum.Not_content_204)
})
