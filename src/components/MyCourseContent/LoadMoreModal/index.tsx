import { Plan } from '@/src/lib/types';
import PlaceOfData from './PlaceOfData';

interface LoadMoreModalProps {
  plan: Plan[];
}

const LoadMoreModal = ({ plan }: LoadMoreModalProps) => {
  return (
    <>
      <section>
        <div>지도 일자별 경로 표시</div>
      </section>
      <section className="overflow-auto">
        {plan.map((planData) => (
          <article key={planData.day}>
            <div className="rounded-s bg-gray-20 p-10 mb-5">
              <strong>{planData.day}일차</strong>
            </div>
            {planData.place.map((placeData) => (
              <PlaceOfData key={placeData.index} data={placeData} />
            ))}
          </article>
        ))}
      </section>
    </>
  );
};

export default LoadMoreModal;
