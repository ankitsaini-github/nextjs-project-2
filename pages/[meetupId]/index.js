import { MongoClient, ObjectId } from "mongodb";

import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  let meetups = [];
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://vercel-admin-user-65da9300c83a2a1b06b38541:vau123123123@cluster0.goaussj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    const db = client.db("meetups");
    meetups = await db.collection("meetups").find({}, { _id: 1 }).toArray();

    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  return {
    fallback: 'blocking',
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
      "mongodb+srv://vercel-admin-user-65da9300c83a2a1b06b38541:vau123123123@cluster0.goaussj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
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
