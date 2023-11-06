import express from 'express'
import bodyParser from 'body-parser'
import {add, completedTodo, deleteDocument, favorite, favoriteTodo, getData, update, updateText} from './db.js'


const app = express()
let index = 0

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',async(req,res)=>{
   res.render('index.ejs',{list:await getData()})
})



app.post('/',async(req,res)=>{
   let todo = req.body.input
   let documents =await add(todo,index)
   index+=1
   res.render('index.ejs',{list:documents})
}) 

app.post('/delete',async(req,res)=>{
   let id = req.body.deleted
   await deleteDocument(id)
   res.redirect('/')
})

app.post('/update',async(req,res)=>{
   let data = await updateText(req.body.updated)
   res.render('update.ejs',{todo:data,id:req.body.updated})
})

app.post('/update-save',async (req,res)=>{
   let id = req.body['id']
   await update(id,req.body['text'])
   res.redirect('/')
})

app.post('/favorite',(req,res)=>{
   let id = req.body.favorite
   favorite(id)
   res.redirect('/')
})

app.get('/favorite',async(req,res)=>{
   let data = await favoriteTodo()
   res.render('favorite.ejs',{list:data})
})

app.post('/completed',async(req,res)=>{
   let id = req.body.completed
   await completedTodo(id)
   res.redirect('/') 
})


app.listen(process.env.PORT || 3000,()=>console.log('server has started'))

