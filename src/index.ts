import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

const products = [{id: "1", title: 'tomato'}, {id: "2", title: "orange"}]
const adresses = [{id: "1", value: 'Nezalejnasti 12'}, {id: "2", value: 'Selikaga 11'}]

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.find(p => p.title.includes(searchString) === true))
    } else {
        res.send(products)
    }
})
app.get('/products/:id', (req: Request, res: Response) => {
    req.params.id
    let product = products.find(p => p.id === req.params.id)

    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.get('/adresses', (req: Request, res: Response) => {
    res.send(adresses)
})
app.get('/adresses/:id', (req: Request, res: Response) => {
    let adress = adresses.find(a => a.id === req.params.id)

    if (adress) {
        res.send(adress)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})