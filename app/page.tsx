import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

const Homepage = () => {
  return (
    <div className="data-full-width bg-black">
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
