import { useRouter } from 'next/router';
import Head from 'next/head';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetUpPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    //send request to API Route
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);

    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="We can add a new meet up here" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetUpPage;
