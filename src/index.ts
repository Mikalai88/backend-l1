import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

const products = [{title: 'tomato'}, {title: "orange"}]
const adresses = [{value: 'Nezalejnasti 12'}, {value: 'Selikaga 11'}]

app.get('/products', (req: Request, res: Response) => {
    res.send(products)
})

app.get('/products/tomato', (req: Request, res: Response) => {
    let tomato = products.find(p => p.title === 'tomato')
    res.send(tomato)
})

app.get('/adresses', (req: Request, res: Response) => {
    res.send(adresses)
})

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})