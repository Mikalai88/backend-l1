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
    canBeDownloaded?: boolean
    minAgeRestriction?: number | null
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
    let author = req.body.author
    let availableResolutions = req.body.availableResolutions

    let errorsMessages = []
    if (!title || !title.trim() || title.length > 40 || typeof (title
    ) !== "string") {
        errorsMessages.push({"message":"title is required","field":"title"})
    }
    if (!author || !author.trim() || author.length > 20 || typeof (author
    ) !== "string") {
        errorsMessages.push({"message":"author is required","field":"author"})
    }
    if (Array.isArray(availableResolutions)) {
        let somethingIsNotString = false;
        availableResolutions.forEach(function(item){
            if(typeof item !== 'string'){
                somethingIsNotString = true;
            }
        })
        let notValidResolutions = availableResolutions.filter(r => !(Object.values(Resolutions).includes(r)))
        if (notValidResolutions.length !== 0) {
            errorsMessages.push({"message":"availableResolutions is required","field":"availableResolutions"})
        }
    }

    if (errorsMessages.length !== 0){
        res.status(400).send({"errorsMessages": errorsMessages})
    }
    let currentDate = new Date();
    let pubDate = new Date(currentDate.getTime() + 86400000);

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        availableResolutions: [Resolutions.P144],
        canBeDownloaded: false,
        createdAt: new Date().toISOString(),
        minAgeRestriction: null,
        publicationDate: pubDate.toISOString()
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
app.put('/videos/:videoId', (req: Request, res: Response) => {
    let title = req.body.title
    let author = req.body.author
    let availableResolutions = req.body.availableResolutions
    let canBeDownloaded = req.body.canBeDownloaded
    let minAgeRestriction = req.body.minAgeRestriction
    let publicationDate = req.body.publicationDate

    let errorsMessages = []
    if (!title || !title.trim() || title.length > 40 || typeof (title
    ) !== "string") {
        errorsMessages.push({"message":"title is required","field":"title"})
    }
    if (!author || !author.trim() || author.length > 20 || typeof (author
    ) !== "string") {
        errorsMessages.push({"message":"author is required","field":"author"})
    }
    if (Array.isArray(availableResolutions)) {
        let somethingIsNotString = false;
        availableResolutions.forEach(function(item){
            if(typeof item !== 'string'){
                somethingIsNotString = true;
            }
        })
        let notValidResolutions = availableResolutions.filter(r => !(Object.values(Resolutions).includes(r)))
        if (notValidResolutions.length !== 0) {
            errorsMessages.push({"message":"availableResolutions is required","field":"availableResolutions"})
        }
    }
    if (typeof (canBeDownloaded) !== "boolean") {
        errorsMessages.push({"message":"canBeDownloaded is required","field":"canBeDownloaded"})
    }
    if (minAgeRestriction !== null && (minAgeRestriction < 1 || minAgeRestriction > 18)) {
        errorsMessages.push({"message":"minAgeRestriction is required","field":"minAgeRestriction"})
    }
    if(typeof(publicationDate) === "string") {
        function isIsoDate(publicationDate: string) {
            if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(publicationDate)) return false;
            const d = new Date(publicationDate);
            return d instanceof Date && !isNaN(d.getTime()) && d.toISOString()===publicationDate; // valid date
        }
        if (!isIsoDate(publicationDate)) {
            errorsMessages.push({"message":"publicationDate is not valid","field":"publicationDate"})
        }
    }
    if (typeof(publicationDate) !== 'string') {
        errorsMessages.push({"message":"publicationDate is not valid","field":"publicationDate"})
    }

    if (errorsMessages.length !== 0){
        res.status(400).send({"errorsMessages": errorsMessages})
    }

    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        video.title = title
        video.author = author
        video.availableResolutions = availableResolutions
        video.canBeDownloaded = canBeDownloaded
        video.minAgeRestriction = minAgeRestriction
        video.publicationDate = publicationDate
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
            }]
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
                "field": "minAgeRestriction"
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
