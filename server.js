const express = require("express") ; 
const bodyParser = require("body-parser") ; 

const app = express() ; 

app.use(bodyParser.urlencoded({extended: false})) ; 
app.use(bodyParser.json()) ; 
app.listen(4000 , () => console.log("server is running")) ;

let data = [
    { id : 1 , name : "Ahmad"} , 
    { id : 2 , name : "Mo"} , 
    { id : 3 , name : "Dave"} , 
]

app.get("/" , (req , res) => {
    res.send(data) ;
})

app.get("/:id" , (req , res) => {
    const item = data.filter(data => data.id === parseInt(req.params.id)) ; 
    if(item.length !== 0) {
        res.send(item) ; 
    } else {
        res.send("item not found") ; 
    }
})

app.post("/" , (req ,res) => {
    data.push(req.body) ; 
    console.log(req.body) ;
    res.send(data) ; 
})

app.put("/:id" , (req ,res) => {
    const target = data.filter(data => data.id === parseInt(req.params.id))[0] ; 
    data = data.map(item => {
        if(item.id == target.id) {
             item = {
                id : req.body.id ? parseInt(req.body.id) : item.id , 
                name : req.body.name ? req.body.name : item.name , 
            }
            console.log(item) ;
            return item ;
        }
        return item;

    })
        res.send(data) ; 

    
})

app.delete("/:id" , (req , res) => {
    const target = data.filter(data => data.id === parseInt(req.params.id))[0] ; 
    data = data.filter(item => {
        return item.id !== target.id ;
    })

    res.send(data) ; 
})