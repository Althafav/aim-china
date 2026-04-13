// pages/_error.tsx
import React from 'react';
import Error from 'next/error';
import Custom500 from '@/components/UI/Custom500';

interface ErrorProps {
  statusCode: number;
}

const CustomErrorPage = ({ statusCode }: ErrorProps) => {
  if (statusCode !== 404) {
    return <Custom500 />;
  }

  return <Error statusCode={statusCode} />;
};

CustomErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
