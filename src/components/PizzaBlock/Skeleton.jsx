import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox='0 0 280 460'
    backgroundColor='#f3f3f3'
    foregroundColor='#d79942'
  >
    <circle cx='135' cy='135' r='130' />
    <rect x='2' y='270' rx='0' ry='0' width='280' height='24' />
    <rect x='0' y='310' rx='0' ry='0' width='278' height='85' />
    <rect x='5' y='410' rx='23' ry='23' width='110' height='45' />
    <rect x='152' y='410' rx='19' ry='19' width='117' height='44' />
  </ContentLoader>
);

export default Skeleton;
