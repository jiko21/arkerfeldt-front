/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Button = styled.button`
  background-color: blue;
`;

const labelStyle = css`
  color: white;
`;

export const Component = () => {
  return (
    <Button>
      <span css={labelStyle}>aaa</span>
    </Button>
  );
};
