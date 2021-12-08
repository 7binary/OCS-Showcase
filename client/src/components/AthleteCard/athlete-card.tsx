import React, { FC } from 'react';
import { Athlete } from 'src/types';
import Image from 'next/image';
import Link from 'next/link';

import cls from './athlete-card.module.css';

interface Props {
  athlete: Athlete;
}

export const AthleteCard: FC<Props> = ({ athlete }) => {
  const bullet = `${athlete.name}-${athlete.surname}`.toLowerCase();

  return (
    <Link href={`/athletes/${athlete.athlete_id}/${bullet}`} passHref>
      <a className={cls.link}>
        <Image
          src={athlete.photo_url!}
          alt={athlete.full_name}
          width={150}
          height={150}
          objectFit="cover"
          objectPosition="top center"
          placeholder="blur"
          blurDataURL="https://via.placeholder.com/150"
        />
        <div className={cls.info}>
          <div className={cls.nameBg} />
          <div className={cls.name}>{athlete.full_name}</div>
        </div>
      </a>
    </Link>
  );
};
