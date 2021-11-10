/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useState } from 'react';
import { Color } from '@/const/color';
import DefaultButton from '@/components/atoms/DefaultButton';
import GithubButton from '@/components/atoms/GithubButton';
import TextForm from '@/components/atoms/TextForm';
import { EmailLoginInfo } from '@/types/loginForm';

const containerStyle = css`
  align-items: center;
  background: #ffffff;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  width: 360px;
  span {
    color: ${Color.BLACK};
    font-size: 18px;
    font-weight: 700;
  }
  > * {
    margin: 8px 0;
  }
`;

const formStyle = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > * {
    margin: 4px 0;
  }
`;

type Props = {
  onEmailLogin: (loginInfo: EmailLoginInfo) => void;
  onGithubLogin: () => void;
};

const LoginForm: FC<Props> = ({ onEmailLogin, onGithubLogin }) => {
  const [email, onChangeEmail] = useState('');
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeEmail(event.target.value);
  };

  const [password, onChangePassword] = useState('');
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePassword(event.target.value);
  };

  return (
    <div css={containerStyle}>
      <span>You should login to continue</span>
      <GithubButton onClick={onGithubLogin} testId="github-btn" />
      <span>OR</span>
      <div css={formStyle}>
        <TextForm
          testId="email"
          type={'email'}
          placeholder={'email'}
          value={email}
          onChange={handleChangeEmail}
        />
        <TextForm
          testId="password"
          type={'password'}
          placeholder={'password'}
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <DefaultButton
        testId="login-btn"
        onClick={() => {
          onEmailLogin({
            email,
            password,
          });
        }}
      >
        Log In
      </DefaultButton>
    </div>
  );
};

export default LoginForm;
