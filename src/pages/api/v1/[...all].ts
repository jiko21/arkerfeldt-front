import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { parseCookies } from 'nookies';
import { authCookie } from '@/const/auth';
import firebaseAdmin from '@/server/firebaseAdmin';

const proxyApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  const auth = firebaseAdmin.auth();
  const sessionId = parseCookies({ req })[authCookie] || '';
  try {
    await auth.verifySessionCookie(sessionId);
    const proxy = httpProxyMiddleware(req, res, {
      target: process.env.API_HOST,
      headers: {
        Authorization: sessionId,
      },
      pathRewrite: [
        {
          patternStr: '^/api/v1',
          replaceStr: '/api',
        },
      ],
    });
    return proxy;
  } catch (e) {
    return res.status(500);
  }
};

export default proxyApi;
