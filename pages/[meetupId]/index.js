import { useRouter } from 'next/router';
import Head from 'next/head';

import { MongoClient, ObjectId } from 'mongodb';

const MeetupDetails = (props) => {
  // const router = useRouter();
  // const { meetupId } = router.query;

  return (
    <>
      <Head>
        <title>{props.meetupData.id}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      {/* JSX的語法所以要加上{} 下面的 */}
      <h1 className="text-2xl text-center">MeetUp Details - {props.meetupData.id}</h1>
      <div>Title : {props.meetupData.title}</div>
      <div>Address : {props.meetupData.address}</div>
      <p className="text-green-600 text-center">meetup description: {props.meetupData.description}</p>
      <img src="https://tluxe-aws.hmgcdn.com/public/article/2017/atl_20180525134714_786.jpg" alt="" />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://casey:lyQQxgED7YMnn1dY@cluster0.dhh5lug.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollections = db.collection('meetups');
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  // const { meetupId } = context.params;

  const client = await MongoClient.connect(
    'mongodb+srv://casey:lyQQxgED7YMnn1dY@cluster0.dhh5lug.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollections = db.collection('meetups');
  const selectedMeetup = await meetupCollections.findOne({ _id: ObjectId(meetupId) });
  // console.log(selectedMeetup);
  client.close();
  return {
    props: {
      meetupData: {
        image: selectedMeetup.image,
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
