import Layout from '@/src/components/common/layout';
import MyRouteContent from '@/src/components/MyRouteContent';

const MyRoute = () => {
  return (
    <Layout hasFooter={false}>
      <div className="flex justify-center">
        <MyRouteContent />
      </div>
    </Layout>
  );
};

export default MyRoute;
