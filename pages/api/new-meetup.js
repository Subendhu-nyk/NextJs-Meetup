import { MongoClient } from "mongodb";


const handler=async(req,res)=>{
    if (req.method==='POST'){
        const data=req.body;
        // const {title,image,address,description}=data
       const client = await MongoClient.connect('mongodb+srv://sunset008:zhz5dnogOPN6jSry@cluster0.taegvij.mongodb.net/meetup?retryWrites=true&w=majority')
       const db=client.db()
       const meetupsCollection= db.collection('meetups-collection');
       const result= await meetupsCollection.insertOne(data)
       console.log(result);
       client.close()
       res.status(201).json({message:"meetup inserted!"})
    }
}
export default handler;