import styled from '@emotion/styled';
import React from 'react';
import { Spin, Typography, Button } from 'antd';

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${(props) => props.marginBottom + 'rem'};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? props.gap + 'rem'
        : props.gap
        ? '2rem'
        : undefined};
  }
`;

// 当数据还没返回的时候，加一个全局的loading
const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FullPageLoading = () => (
  <FullPage>
    <Spin size={'large'} />
  </FullPage>
);

export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>
);

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  // 只要接口符合某个特征就认为它是这个类型
  if (isError(error)) {
    return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>;
  }
  return null;
};
