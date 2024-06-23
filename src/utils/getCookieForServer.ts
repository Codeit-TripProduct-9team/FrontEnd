import { NextRequest } from 'next/server';

function getCookieForServer(cookieName: string, request: NextRequest): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies[cookieName] || null;
}

export default getCookieForServer;
