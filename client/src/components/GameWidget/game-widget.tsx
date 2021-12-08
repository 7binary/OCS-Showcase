import { FC } from 'react';
import { Typography } from 'antd';

import { Game } from 'src/types';
import { AthleteCard } from 'src/components';
import cls from './game-widget.module.css';

interface Props {
  game: Game;
}

export const GameWidget: FC<Props> = ({ game }) => {
  return (
    <div className={cls.game}>
      <Typography.Title level={4}>{game.city}, {game.year}</Typography.Title>
        <div className={cls.athletes}>
          {(game.results || []).map(result => (
            <div className={cls.athlete} key={result.athlete_id} >
              <AthleteCard athlete={result.athlete} />
            </div>
          ))}
        </div>
    </div>
  );
};
