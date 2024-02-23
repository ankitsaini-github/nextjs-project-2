import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetailPage(props){
  return(
    <MeetupDetail
      image={props.image}
      title={props.title}
      address={props.address}
      description={props.description}
    />
  )
};
export async function getStaticPaths(){
  return {
    fallback: false,
    paths:[
      {
        params:{
          meetupId:'m1',
        },
      },
      {
        params:{
          meetupId:'m2',
        },
      },
      {
        params:{
          meetupId:'m3',
        },
      },
    ]
  }
}

export async function getStaticProps(context){
  const meetupid=context.params.meetupId;
  return {
    props:{
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
      title: 'First Meetup',
      address: 'Some Street 5, Some City',
      description: 'This is a first meetup',
    }
  }
}
export default MeetupDetailPage;