import { Helmet } from 'react-helmet';
import React from 'react';
import Logo from '@assets/logo512.png';

const SEO = ({
  title,
  description,
  url,
  image,
  me,
  meta = [],
}: {
  title?: string;
  description?: string;
  url: string;
  image?: string;
  me?: string;
  meta?: { property: string; content: string }[];
}) => {
  return (
    <Helmet
      title={title}
      htmlAttributes={{ lang: 'ko_KR' }}
      meta={[
        ...meta,
        { name: `description`, content: description },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:image',
          content: image ? image : Logo,
        },
        // {
        //   property: 'fb:app_id',
        //   content: someFbAppId,
        // },
        {
          property: 'twitter:card',
          content: 'summary',
        },
        {
          property: 'twitter:creator',
          content: me ? me : 'unknown',
        },
        {
          property: 'twitter:title',
          content: title,
        },
        {
          property: 'twitter:description',
          content: description,
        },
        {
          property: 'twitter:image',
          content: image ? image : Logo,
        },
      ]}
    />
  );
};

export default React.memo(SEO);
