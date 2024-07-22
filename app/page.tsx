import React from 'react';
import ClientComponent from './issues/ClientComponent';
import { Metadata } from 'next';

const Homepage = () => {
  return (
    <div>
      <ClientComponent />
    </div>
  );
};

export default Homepage;

export const dynamic = 'force-dynamic';//. Dynamic rendering (SSR - Server-Side Rendering) is used when the content changes frequently and needs to be fetched or processed at request time.

export const metadata: Metadata = {
  title: 'IssueTracker Dashboard',
  description: 'IssueTracker Home page',
};
