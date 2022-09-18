import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups With Us in Hawaii</title>
        <meta name="description" content="We can have a meet up in hawaii island!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  //fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://casey:lyQQxgED7YMnn1dY@cluster0.dhh5lug.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollections = db.collection('meetups');
  const meetupsData = await meetupCollections.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetupsData.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
