"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolutions = exports.CodeResponsesEnum = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
var CodeResponsesEnum;
(function (CodeResponsesEnum) {
    CodeResponsesEnum[CodeResponsesEnum["Incorrect_values_400"] = 400] = "Incorrect_values_400";
    CodeResponsesEnum[CodeResponsesEnum["Not_found_404"] = 404] = "Not_found_404";
    CodeResponsesEnum[CodeResponsesEnum["Not_content_204"] = 204] = "Not_content_204";
})(CodeResponsesEnum || (exports.CodeResponsesEnum = CodeResponsesEnum = {}));
var Resolutions;
(function (Resolutions) {
    Resolutions["P144"] = "P144";
    Resolutions["P240"] = "P240";
    Resolutions["P360"] = "P360";
    Resolutions["P480"] = "P480";
    Resolutions["P720"] = "P720";
    Resolutions["P1080"] = "P1080";
    Resolutions["P1440"] = "P1440";
    Resolutions["P2160"] = "P2160";
})(Resolutions || (exports.Resolutions = Resolutions = {}));
let videos = [];
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
exports.app.get('/videos', (req, res) => {
    // if (req.query.title) {
    //     let searchString = req.query.title.toString();
    //     res.send(products.filter(p => p.title.includes(searchString)))
    // } else {
    res.status(200).send(videos);
    // }
});
exports.app.post('/videos', (req, res) => {
    let title = req.body.title;
    if (!title || !title.trim() || title.length > 40 || typeof (title) !== "string") {
        res.status(400).send({
            "errorsMessages": [{
                    "message": "Incorrect title",
                    "field": "title"
                }],
            resultCode: 1
        });
        return;
    }
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.app.put('/videos/:videoId', (req, res) => {
    let title = req.body.title;
    if (!title || !title.trim() || title.length > 40 || typeof (title) !== "string") {
        res.status(400).send({
            "errorsMessages": [{
                    "message": "Incorrect title",
                    "field": "title"
                }],
            resultCode: 1
        });
        return;
    }
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id);
    if (video) {
        video.title = title;
        res.status(204).send(video);
    }
    else {
        res.send(404);
    }
});
exports.app.get('/videos/:id', (req, res) => {
    let video = videos.find(v => v.id === +req.params.id);
    if (video) {
        res.status(200).send(video);
    }
    else {
        res.send(404);
    }
});
exports.app.put('/videos/:id', (req, res) => {
    let title = req.body.title;
    if (!title || !title.trim() || title.length > 40 || typeof (title) !== "string") {
        res.status(400).send({
            "errorsMessages": [{
                    "message": "Incorrect title",
                    "field": "title"
                }],
            resultCode: 1
        });
        return;
    }
    let author = req.body.author;
    if (!author || !author.trim() || author.length > 20 || typeof (author) !== "string") {
        res.status(400).send({
            "errorsMessages": [{
                    "message": "Incorrect author",
                    "field": "author"
                }],
            resultCode: 1
        });
        return;
    }
    let availableResolutions = req.body.availableResolutions;
    if (!availableResolutions) {
        res.status(400).send({
            "errorsMessages": [{
                    "message": "Incorrect availableResolutions",
                    "field": "availableResolutions"
                }],
            resultCode: 1
        });
        return;
    }
    let minAgeRestriction = req.body.minAgeRestriction;
    if (minAgeRestriction === null || typeof (minAgeRestriction) !== "number" || (minAgeRestriction < 1 && minAgeRestriction > 18)) {
        res.status(400).send({
            "errorsMessages": [{
                    "message": "Incorrect availableResolutions",
                    "field": "availableResolutions"
                }],
            resultCode: 1
        });
        return;
    }
    let video = videos.find(v => v.id === +req.params.id);
    if (video) {
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = Resolutions.P144;
        video.canBeDownloaded = true;
        video.minAgeRestriction = 18;
        video.publicationDate = "2023-11-11T18:52:12.809Z";
        res.status(204);
    }
    else {
        res.send(404);
    }
});
exports.app.delete('/videos/:id', (req, res) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204);
            return;
        }
        res.send(404);
    }
});
exports.app.delete('/testing/all-data', (req, res) => {
    videos = [];
    res.status(CodeResponsesEnum.Not_content_204);
});
