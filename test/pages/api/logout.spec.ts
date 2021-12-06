import httpMocks from 'node-mocks-http';
import logout from '@/pages/api/logout';
import { NextApiRequest, NextApiResponse } from 'next';
import { authCookie } from '@/const/auth';
import firebaseAdmin from '@/server/firebaseAdmin';
import { destroyCookie, parseCookies } from 'nookies';

jest.mock('@/server/firebaseAdmin');
jest.mock('nookies');

describe('/api/logout', () => {
  const verifySessionCookieMock = jest.fn();
  const revokeRefreshTokensMock = jest.fn();

  jest.spyOn(firebaseAdmin, 'auth').mockReturnValue({
    verifySessionCookie: verifySessionCookieMock,
    revokeRefreshTokens: revokeRefreshTokensMock,
  } as any);

  test('404 when method is not `POST`', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mockRequest = httpMocks.createRequest<NextApiRequest>({
      method: 'GET',
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mockResponse = httpMocks.createResponse<NextApiResponse>();

    await logout(mockRequest, mockResponse);

    expect(mockResponse.statusCode).toEqual(404);
  });

  test('correctly return with destroy cookie success ', async () => {
    const FIREBASE_COOKIE = 'cookie';
    (parseCookies as jest.Mock).mockReturnValue({
      [authCookie]: FIREBASE_COOKIE,
    });
    verifySessionCookieMock.mockResolvedValue({
      sub: 'sub',
    });
    revokeRefreshTokensMock.mockResolvedValue({});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mockRequest = httpMocks.createRequest<NextApiRequest>({
      method: 'POST',
      headers: {
        cookies: {
          [authCookie]: FIREBASE_COOKIE,
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mockResponse = httpMocks.createResponse<NextApiResponse>();

    await logout(mockRequest, mockResponse);

    expect(destroyCookie).toBeCalledWith({ res: mockResponse }, authCookie, {
      path: '/',
    });
    expect(mockResponse._getJSONData()).toEqual({
      msg: 'success',
    });
  });

  test('correctly return with destroy cookie failed ', async () => {
    verifySessionCookieMock.mockResolvedValue({
      sub: 'sub',
    });
    revokeRefreshTokensMock.mockRejectedValue(new Error());
    const FIREBASE_COOKIE = 'cookie';
    (parseCookies as jest.Mock).mockReturnValue({
      [authCookie]: FIREBASE_COOKIE,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mockRequest = httpMocks.createRequest<NextApiRequest>({
      method: 'POST',
      headers: {
        cookies: {
          [authCookie]: FIREBASE_COOKIE,
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mockResponse = httpMocks.createResponse<NextApiResponse>();

    await logout(mockRequest, mockResponse);

    expect(mockResponse.statusCode).toEqual(500);
  });
});
