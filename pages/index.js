import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

export async function getStaticProps() {
  let meetups=[];
  // await MongoClient.connect(
  //   "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
  //   async function (err, client) {
  //     if (err) throw err;

  //     const db = client.db("meetups");
  //     meetups=await db.collection("meetups").find({}).toArray();
  //     console.log(meetups)
  //     client.close();
  //   }
  // );

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    const db = client.db("meetups");
    meetups = await db.collection("meetups").find({}).toArray();
    
    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }


  return {
    props: {
      meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
              })),
    },
    revalidate:3,
  };
}

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}
