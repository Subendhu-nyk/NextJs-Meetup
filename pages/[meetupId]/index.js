import { Fragment } from "react";
import MeetupDetail from '../../components/meetups/MeetupDetail';


const MeetupDetails=()=>{
return(
   <Fragment>
     <MeetupDetail
      image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg'
      title='First Meetup'
      address='Some Street 5, Some City'
      description='This is a first meetup'
    />
   </Fragment>
)
}

export async function getStaticPaths(){
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

export async function getStaticProps(context){
// fetch data from a single meetup
const meetupId=context.params.meetupId;
console.log("meetupId>>",meetupId)

return{
  props:{
    meetupData:{
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
      title:meetupId,
      id:'m1',
      address:'Some Street 5, Some City',
      description:'This is a first meetup',
    }
  },
  revalidate:10
}
}


export default MeetupDetails;