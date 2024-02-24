import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailPage(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
export async function getStaticPaths() {
  let meetups = [];
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    const db = client.db("meetups");
    meetups = await db.collection("meetups").find({}, { _id: 1 }).toArray();

    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupid = context.params.meetupId;
  let meetup;
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    const db = client.db("meetups");
    meetup = await db
      .collection("meetups")
      .findOne({ _id: ObjectId(meetupid) });

    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}
export default MeetupDetailPage;
