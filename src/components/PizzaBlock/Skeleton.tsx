import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="259" y="130" rx="0" ry="0" width="0" height="2" />
    <rect x="0" y="295" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="347" rx="10" ry="10" width="280" height="75" />
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="435" rx="10" ry="10" width="95" height="40" />
    <rect x="119" y="435" rx="10" ry="10" width="152" height="45" />
  </ContentLoader>
);
export default Skeleton;
