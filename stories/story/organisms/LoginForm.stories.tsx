import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import LoginForm from '@/components/organisms/LoginForm';
import { EmailLoginInfo } from '@/types/loginForm';

export default {
  title: 'Organisms/LoginForm',
  component: LoginForm,
} as Meta;

const Template: Story<React.ComponentProps<typeof LoginForm>> = (args) => {
  const onEmailLogin = (loginInfo: EmailLoginInfo) => {
    console.log(loginInfo);
  };
  return (
    <LoginForm
      {...args}
      onEmailLogin={onEmailLogin}
      onGithubLogin={() => {
        console.log('github login button clicked');
      }}
    />
  );
};

export const Sample1 = Template.bind({});
Sample1.args = {};
