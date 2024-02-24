import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const {title,image,address,description}=data;

    // const client = await MongoClient.connect(
    //   "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    // );
    // const db = client.db;

    // const meetupsCollection = db.collection("meetups");
    // const result = await meetupsCollection.insertOne(data);
    // console.log(result);

    // client.close();

    MongoClient.connect(
      "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
      function (err, client) {
        if (err) throw err;

        var db = client.db("meetups");

        db.collection("meetups").insertOne(data);
        client.close();
      }
    );

    res.status(201).json({ message: "meetup inserted" });
  }
}
export default handler;
