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
export const metadata: Metadata = {
  title: 'IssueTracker Dashboard',
  description: 'IssueTracker Home page',
};
