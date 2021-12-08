import React from 'react';
import { Layout, Button, Typography } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

import { Container, Logo, MessageKey, Msg } from 'src/components';
import linkedinIcon from 'public/footer/linkedin.png';
import facebookIcon from 'public/footer/facebook.png';
import twitterIcon from 'public/footer/twitter.png';
import youtubeIcon from 'public/footer/youtube.png';
import cls from './footer.module.css';

interface SocialLink {
  icon: any;
  link: string;
  title: string;
}

const socialLinks: SocialLink[] = [
  { icon: linkedinIcon, link: 'https://www.linkedin.com', title: 'Linked In' },
  { icon: facebookIcon, link: 'https://facebook.com', title: 'Facebook' },
  { icon: twitterIcon, link: 'https://twitter.com', title: 'Twitter' },
  { icon: youtubeIcon, link: 'https://www.youtube.com', title: 'YouTube' },
];

const FooterLink: React.FC<{link: string, msg: MessageKey}> = ({ link, msg }) => (
  <Link href={link} passHref>
    <Typography.Link href={link} className={cls.link}>
      <Msg id={msg} />
    </Typography.Link>
  </Link>
);

const FooterGroup: React.FC<{msg: MessageKey}> = ({ msg }) => (
  <div className={cls.group}>
    <Msg id={msg} />
  </div>
);

export const Footer = () => {
  return (
    <Layout.Footer>
      <Container>
        <div className={cls.footer}>
          <div className={cls.footerCol}>
            <Logo href="/" small />
          </div>
          <div className={cls.footerCol}>
            <FooterGroup msg="menuGames" />
            <FooterLink link="/" msg="menuAthletes" />
            <FooterLink link="/news" msg="menuNews" />
          </div>
          <div className={cls.footerCol}>
            <FooterGroup msg="menuGames" />
            <FooterLink link="/" msg="menuAthletes" />
            <FooterLink link="/news" msg="menuNews" />
          </div>
          <div className={cls.footerCol}>
            <FooterGroup msg="menuGames" />
            <FooterLink link="/" msg="menuAthletes" />
            <FooterLink link="/news" msg="menuNews" />
          </div>
        </div>
        <div className={cls.social}>
          {socialLinks.map(socialLink => (
            <Link href={socialLink.link} key={socialLink.link}>
              <a target="_blank" className={cls.socialLink}>
                <Button type="default" title={socialLink.title} className={cls.socialBtn}>
                  <Image alt={socialLink.title} src={socialLink.icon} width={50} height={50} />
                </Button>
              </a>
            </Link>
          ))}
        </div>
        <div className={cls.copyright}>
          <Msg id="footerCopyright" />
        </div>
      </Container>
    </Layout.Footer>
  );
};

