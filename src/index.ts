import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

const products = [{title: 'tomato'}, {title: "orange"}]
const adresses = [{value: 'Nezalejnasti 12'}, {value: 'Selikaga 11'}]

app.get('/products', (req: Request, res: Response) => {
    res.send(products)
})

app.get('/products/:productTitle', (req: Request, res: Response) => {
    req.params.productTitle
    let product = products.find(p => p.title === req.params.productTitle)
    res.send(product)
})

app.get('/adresses', (req: Request, res: Response) => {
    res.send(adresses)
})

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})