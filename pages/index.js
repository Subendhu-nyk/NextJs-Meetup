import MeetupList from '../components/meetups/MeetupList'
import Layout from '../components/layout/Layout'
import { useEffect } from 'react';
import { MongoClient } from 'mongodb';

// const DUMMY_MEETUPS = [
//     {
//       id: 'm1',
//       title: 'A First Meetup',
//       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//       address: 'Some address 5, 12345 Some City',
//       description: 'This is a first meetup!'
//     },
//     {
//       id: 'm2',
//       title: 'A Second Meetup',
//       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//       address: 'Some address 10, 12345 Some City',
//       description: 'This is a second meetup!'
//     }
//   ];  
  
const HomePage = (props) => {
  // const [loadedMeetups,setLoadedMeetups]=useState([])
  // useEffect(()=>{
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // },[])
  return (    
        <MeetupList meetups={props.meetups} />   
    
  )
}

export async function getStaticProps(){
// fetch data from an API
const client = await MongoClient.connect('mongodb+srv://sunset008:zhz5dnogOPN6jSry@cluster0.taegvij.mongodb.net/meetup?retryWrites=true&w=majority')
const db=client.db()
const meetupsCollection= db.collection('meetups-collection');
const meetups= await meetupsCollection.find().toArray()
client.close()
return{
  props:{
    meetups:meetups.map(meetup=>({
      title:meetup.title,
      address:meetup.address,
      image:meetup.image,
      id:meetup._id.toString(),
    }))
  },
  revalidate:10
}
}

// export async function getServerSideProps(context){
//   const req=context.req;
//   const res=context.res;
  
//   return{
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage