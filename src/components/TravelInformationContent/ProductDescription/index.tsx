import Image from 'next/image';

import ProductMap from './ProductMap';

const placeData = {
  imageSource: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
  title: '충남 예산',
  description:
    '981년 7,283㎡의 면적으로 설립되었으며 주로 의류, 채소, 생선 등의 품목을 취급한다. 1926년부터 시작된 예산 5일장과 더불어 번영을 누렸으나 최근에는 심화되는 수도권 집중 문제로 인한 예산군의 인구 감소로 꾸준히 내리막길을 걸어왔다. 5일장이 열리는 날에는 읍내의 남양돈가스와 쌍송배기 정류소까지 가판대와 사람들이 가득찼으나, 최근에 이르러서는 상설시장 앞 공영주차장과 도로 일부를 차지하는 정도에 그쳤다. 이를 해결하고자 예산군에서는 시장 현대화 사업을 몇 차례 진행하였으나 인구 감소라는 근본적인 문제를 해결하지 못한 상황에서 큰 성과는 없었다.',
  position: { lat: 36.676975813168404, lng: 126.84966463813139 },
  markerPosition: [{ lat: 36.676975813168404, lng: 126.84966463813139 }],
};

const ProductDescription = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-30">
      <div className="flex flex-col justify-center items-center gap-12">
        <Image
          className="w-full h-455 object-cover"
          width={1440}
          height={455}
          src={placeData.imageSource}
          alt="place-image"
        />
        <h2 className="mt-20 text-20 font-bold">{placeData.title}</h2>
        <p className="text-center ml-284 mr-314">{placeData.description}</p>
        <ProductMap mapPosition={placeData.position} markerList={placeData.markerPosition} />
      </div>
    </section>
  );
};

export default ProductDescription;
