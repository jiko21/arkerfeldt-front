import React from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import firebaseAdmin from '@/server/firebaseAdmin';
import { authCookie } from '@/const/auth';
import { useLogout } from '@/hooks/useAuth';

const Posts = () => {
  const { onSignOut } = useLogout();
  return (
    <div>
      post page
      <button onClick={onSignOut}>サインアウト</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const session = cookies[authCookie] || '';
  try {
    const user = await firebaseAdmin.auth().verifySessionCookie(session, true);
    console.log(user);
    return {
      props: {
        user: user,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Posts;
