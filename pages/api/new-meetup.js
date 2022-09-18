//api/new-meetup
//password lyQQxgED7YMnn1dY
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const { title, image, address, description } = data;
    //把這些資料存在database
    const client = await MongoClient.connect(
      'mongodb+srv://casey:lyQQxgED7YMnn1dY@cluster0.dhh5lug.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupCollections = db.collection('meetups');
    const result = await meetupCollections.insertOne(data);
    console.log(result); //generate ID
    client.close();
    res.status(201).json({ message: 'meetup insert successfully!' });
  }
};

export default handler;
