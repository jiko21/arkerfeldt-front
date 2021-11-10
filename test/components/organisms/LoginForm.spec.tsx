import LoginForm from '@/components/organisms/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';

describe('CheckBox.tsx', () => {
  let onEmailLoginMock: jest.Mock;
  let onGithubLoginMock: jest.Mock;
  beforeEach(() => {
    onEmailLoginMock = jest.fn();
    onGithubLoginMock = jest.fn();
  });

  afterEach(() => {
    onEmailLoginMock.mockClear();
    onGithubLoginMock.mockClear();
  });

  it('should correctly render (checked: true)', () => {
    const props = {
      onEmailLogin: onEmailLoginMock,
      onGithubLogin: onGithubLoginMock,
    };
    const { container } = render(<LoginForm {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should correctly call onEmailLoginMock when clicked email login button', () => {
    const props = {
      onEmailLogin: onEmailLoginMock,
      onGithubLogin: onGithubLoginMock,
    };
    render(<LoginForm {...props} />);
    fireEvent.input(screen.getByTestId('email'), {
      target: {
        value: 'test',
      },
    });
    fireEvent.input(screen.getByTestId('password'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.click(screen.getByTestId('login-btn'));
    expect(onEmailLoginMock).toBeCalledWith({
      email: 'test',
      password: 'password',
    });
  });

  it('should correctly call onGithubLoginMock when clicked github login button', () => {
    const props = {
      onEmailLogin: onEmailLoginMock,
      onGithubLogin: onGithubLoginMock,
    };
    render(<LoginForm {...props} />);
    fireEvent.click(screen.getByTestId('github-btn'));
    expect(onGithubLoginMock).toBeCalled();
  });
});
