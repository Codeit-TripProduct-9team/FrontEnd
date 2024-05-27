import Layout from '@/src/components/common/layout';
import MyRouteContent from '@/src/components/MyRouteContent';

// import dynamic from 'next/dynamic';
// const MyRouteContent = dynamic(() => import('@/src/components/MyRouteContent'), { ssr: false });

const MyRoute = () => {
  return (
    <Layout hasFooter={false}>
      <MyRouteContent />
    </Layout>
  );
};

export default MyRoute;
