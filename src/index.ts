import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

const products = [{title: 'tomato'}, {title: "orange"}]
const adresses = [{id: "1", value: 'Nezalejnasti 12'}, {id: "2", value: 'Selikaga 11'}]

app.get('/products', (req: Request, res: Response) => {
    res.send(products)
})
app.get('/products/:productTitle', (req: Request, res: Response) => {
    req.params.productTitle
    let product = products.find(p => p.title === req.params.productTitle)

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
    let adresse = adresses.find(a => a.id === req.params.id)

    if (adresse) {
        res.send(adresse)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})