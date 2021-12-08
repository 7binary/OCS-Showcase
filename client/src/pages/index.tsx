import { GetStaticPropsResult } from 'next';
import { FC } from 'react';

import { Game } from 'src/types';
import { gameHttp } from 'src/network';
import { GamesWidget, useTranslate } from 'src/components';
import Head from 'next/head';

interface Props {
  initialGames: Game[];
  initialTotal: number;
}

const HomePage: FC<Props> = ({ initialGames, initialTotal }) => {
  const t = useTranslate();

  return (
    <>
      <Head>
        <title>{t('menuAthletes')} | OCS</title>
        <meta name="description" content="News of OCS" />
      </Head>
      <GamesWidget
        initialGames={initialGames || []}
        initialTotal={initialTotal}
      />
    </>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const { games, total } = await gameHttp.getGames(0, 5);

  return {
    props: {
      initialGames: games,
      initialTotal: total,
    },
    revalidate: 300,
  };
}

export default HomePage;
