import React, { FC } from 'react';
import { Button, Divider, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { LeftOutlined } from '@ant-design/icons';
import Markdown from 'markdown-to-jsx';

import { Athlete } from 'src/types';
import { Container } from 'src/components';
import medalGold from 'public/medals/medal_gold.png';
import medalSilver from 'public/medals/medal_silver.png';
import medalBronze from 'public/medals/medal_bronze.png';
import cls from './athlete-details.module.css';

interface Props {
  athlete: Athlete;
}

export const AthleteDetails: FC<Props> = ({ athlete }) => {
  const results = athlete.results || [];

  return (
    <Container>
      <div className={cls.title}>
        <Link href="/" passHref>
          <Button icon={<LeftOutlined />} type="text" />
        </Link>
        <Typography.Title level={1}>{athlete.full_name} details</Typography.Title>
      </div>

      <div className={cls.headline}>
        <div className={cls.headlineAvatar}>
          <Image
            src={athlete.photo_url!}
            alt={athlete.full_name}
            width={200}
            height={200}
            objectFit="cover"
            objectPosition="top center"
            placeholder="blur"
            blurDataURL="https://via.placeholder.com/200"
          />
        </div>
        <div className={cls.headlineInfo}>
          <div className={cls.row}>
            <span className={cls.label}>Name:</span>
            <span className={cls.value}>{athlete.full_name}</span>
          </div>
          <div className={cls.row}>
            <span className={cls.label}>Date of birth:</span>
            <span className={cls.value}>{athlete.date_of_birth}</span>
          </div>
          <div className={cls.row}>
            <span className={cls.label}>Weight:</span>
            <span className={cls.value}>{athlete.weight} kg</span>
          </div>
          <div className={cls.row}>
            <span className={cls.label}>Height:</span>
            <span className={cls.value}>{athlete.height} cm</span>
          </div>
        </div>
      </div>
      <Divider />

      {results.length > 0 && (
        <>
          <Typography.Title level={4}>Medals</Typography.Title>
          <ul className={cls.results}>
            {results.map(result => (
              <li className={cls.result} key={result.game_id}>
                <div className={cls.resultTitle}>
                  {result.game.city}, {result.game.year}
                </div>
                <div className={cls.medals}>
                  {result.gold > 0 && (
                    <div className={cls.medal}>
                      <span className={cls.medalCount}>{result.gold}</span>
                      <Image src={medalGold} alt="Gold medal"/>
                    </div>
                  )}
                  {result.silver > 0 && (
                    <div className={cls.medal}>
                      <span className={cls.medalCount}>{result.silver}</span>
                      <Image src={medalSilver} alt="Silvel medal"/>
                    </div>
                  )}
                  {result.bronze > 0 && (
                    <div className={cls.medal}>
                      <span className={cls.medalCount}>{result.bronze}</span>
                      <Image src={medalBronze} alt="Bronze medal" />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <Typography.Title level={4}>Bio</Typography.Title>
      <Markdown>{athlete.bio!}</Markdown>

    </Container>
  );
};
