import { Fragment } from "react";
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient,ObjectId } from "mongodb";


const MeetupDetails=(props)=>{
return(  
   <Fragment>
     <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
   </Fragment>
)
}

export async function getStaticPaths(){
  const client = await MongoClient.connect('mongodb+srv://sunset008:zhz5dnogOPN6jSry@cluster0.taegvij.mongodb.net/meetup?retryWrites=true&w=majority')
  const db=client.db()
  const meetupsCollection= db.collection('meetups-collection');
  const meetups= await meetupsCollection.find({},{_id:1}).toArray();
  client.close()
  return {
    fallback: 'blocking',
    paths:meetups.map(meetup=>({params:{meetupId:meetup._id.toString()}}))    
  };
}

export async function getStaticProps(context){
// fetch data from a single meetup
const meetupId=context.params.meetupId;
const client = await MongoClient.connect('mongodb+srv://sunset008:zhz5dnogOPN6jSry@cluster0.taegvij.mongodb.net/meetup?retryWrites=true&w=majority')
  const db=client.db()
  const meetupsCollection= db.collection('meetups-collection');
  // const meetups= await meetupsCollection.find({},{_id:1}).toArray();
  const selectedMeetup=await meetupsCollection.findOne({_id:new ObjectId(meetupId)})
  client.close()
console.log("meetupId>>",meetupId)

return{
  props:{
    meetupData:{
      id:selectedMeetup._id.toString(),
      title:selectedMeetup.title,
      address:selectedMeetup.address,
      image:selectedMeetup.image,
      description:selectedMeetup.description
    }
  },
  revalidate:10
}
}


export default MeetupDetails;