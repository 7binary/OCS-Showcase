import React, { useState, FC } from 'react';
import { List, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Typography } from 'antd';

import { Game } from 'src/types';
import { Msg, Container } from 'src/components';
import { useRequest } from 'src/hooks';
import { gameHttp } from 'src/network';
import { GameWidget } from '../GameWidget';
import cls from './games-widget.module.css';

interface Props {
  initialGames: Game[];
  initialTotal: number;
}

export const GamesWidget: FC<Props> = ({ initialGames, initialTotal }) => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [total, setTotal] = useState<number>(initialTotal);
  const hasMore = games.length < total;

  const { submit: loadMoreData } = useRequest(async () => {
    const { games: nextGames, total: nextTotal } = await gameHttp.getGames(games.length, 5);
    setTotal(nextTotal);
    setGames([...games, ...nextGames]);
  });

  return (
    <Container>
      <Typography.Title level={1}>
        <Msg id="menuAthletes" />
      </Typography.Title>
      <div className={cls.games}>
        <InfiniteScroll
          dataLength={games.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain />}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={games}
            renderItem={(game: Game) => (
              <List.Item key={game.game_id}>
                <GameWidget game={game} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Container>
  );
};
