import Image from 'next/image';

interface LocationDescriptionProps {
  image: string;
  title: string;
  description: string;
}

const LocationDescription = ({ image, title, description }: LocationDescriptionProps) => {
  return (
    <>
      {image && (
        <Image
          className="w-full h-455 object-cover"
          width={1440}
          height={455}
          src={image.replace(/'/g, '')}
          alt="defalut"
          quality={100}
          priority
        />
      )}

      <h2 className="mt-20 text-20 font-bold">{title}</h2>
      <p className="text-center ml-284 mr-314 min-w-800">{description}</p>
    </>
  );
};

export default LocationDescription;
