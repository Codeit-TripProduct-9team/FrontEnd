interface Coordinate {
  lat: number | string;
  lng: number | string;
}

interface DirectionRequest {
  requestUrl: string;
  headers: Record<string, string>;
}

const getDirectionRequest = (originCoordinate: Coordinate, destinationCoordinate: Coordinate): DirectionRequest => {
  const REST_API_KEY = 'cc81aff4a39ec9dc0f2227e92f473f24';
  const directionUrl = 'https://apis-navi.kakaomobility.com/v1/directions';

  const headers: Record<string, string> = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const queryParams = new URLSearchParams({
    origin: `${originCoordinate.lng},${originCoordinate.lat}`,
    destination: `${destinationCoordinate.lng},${destinationCoordinate.lat}`,
  });

  const requestUrl = `${directionUrl}?${queryParams}`;

  return { requestUrl, headers };
};

export default getDirectionRequest;
