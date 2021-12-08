import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import { athleteHttp } from 'src/network';
import { Athlete } from 'src/types';
import { AthleteDetails } from 'src/components';

interface Props {
  serverAthlete: Athlete | null;
}

const AthletePage = ({ serverAthlete = null }: Props) => {
  const router = useRouter();
  const { id } = router?.query || {};
  const [athlete, setAthlete] = useState<Athlete | null>(serverAthlete);

  useEffect(() => {
    // refresh athlete info
    if (id) {
      (async () => {
        const fetchedAthlete = await athleteHttp.getAthletById(+id);
        setAthlete(fetchedAthlete);
      })();
    }
  }, [id]);

  if (!athlete) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{athlete.full_name} | OCS</title>
        <meta name="description" content={`Athlete ${athlete.full_name}`} />
      </Head>
      <AthleteDetails athlete={athlete} />
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext):
  Promise<GetStaticPropsResult<Props>> {
  const { id } = context.params as any;
  const athlete = await athleteHttp.getAthletById(+id);

  if (!athlete) {
    return { notFound: true };
  }

  return {
    props: { serverAthlete: athlete },
    revalidate: 300,
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const athletes = await athleteHttp.getAthlets();
  const paths = athletes.map(athlete => ({
    params: {
      id: athlete.athlete_id.toString(),
      name: `${athlete.name}-${athlete.surname}`.toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default AthletePage;
