import {MongoClient, ObjectId} from 'mongodb'
import * as dotenv from 'dotenv'

dotenv.config()

const uri = process.env.URI
const client = new MongoClient(uri)
await client.connect()
const db = client.db('todoDB')
const collection = db.collection('todoList')


async function getData(){
   try{
      return await collection.find({}).toArray()
   }catch(err){
      console.log(err)
   }
}


async function add(data,id){

   try{
     // insert document
     await collection.insertOne(
        {
            index: id,
            todo: data,
            important:false,
            completed:false
        }
     )
      
     // retrieving data
     let documents = await  collection.find().toArray()
     return documents
   }catch(err){
      console.log(err)
   }finally{
      client.close
   } 
    
}

async function update(id,edited){
   try{
      await collection.updateOne({_id:new ObjectId(id)},{$set:{todo:edited}})
   }catch(err){
      console.log(err)
   }
}


async function updateText(id){
   try{
      let data= await collection.findOne({_id:new ObjectId(id)})
      return data['todo']
   }catch(err){
      console.log(err)
   }
}


async function deleteDocument(id){
   try{
      console.log(typeof(id))
      
      let d = await collection.deleteOne({_id:new ObjectId(id)})
      console.log(d)
   }catch(err){
      console.log(err)
   }
}

async function favorite(id){
   try{
      await collection.updateOne({_id:new ObjectId(id)},{$set:{important:true}})
   }catch(err){
      console.log(err)
   }
}

async function favoriteTodo(){
   try{
      return await collection.find({important:true}).toArray()
   }catch(err){
      console.log(err)
   }
}

async function completedTodo(id){
   try{
      await collection.updateOne({_id:new ObjectId(id)},{$set:{completed:true}})
   }catch(err){
      console.log(err)
   }
}

// async function completed(){ 
//    try{
//       return await collection.find({completed:true}).toArray()
//    }catch(err){
//       console.log(err)
//    }
// }

export {add,getData,deleteDocument,updateText,update,favorite,favoriteTodo,completedTodo}

// const schema =new mongoose.Schema({
//     id:{
//         type:Number,
//         unique:true,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     address:{
//         type:String,
//     },
//     salary:{
//         type:Number,
//     }
// })

// const model = mongoose.model('todolists',schema)

// async function add(data) {
//     try {
//       await client.connect();
//       const db = client.db('todoDB');
//       const collection = db.collection('todoList');
  
//       // Insert the new todo
//       await collection.insertOne({
//         todo: data
//       });
  
//       // After insertion, retrieve the updated todo list
//       let todoList = await collection.find({}).toArray();
//       console.log(todoList);
  
//     } catch (err) {
//       console.log(err);
//     } finally {
//       // Make sure to close the database connection
//       await client.close();
//     }
//   }
  