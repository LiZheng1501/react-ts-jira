import React from 'react';
import { Raw } from 'types';
import { Select } from 'antd';

// 定义传入这个组件的props规范
interface IdSelectProps
  extends Omit<
    SelectProps,
    'value' | 'onChange' | 'defaultOptionName' | 'options'
  > {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/** 
需要注意的事情，透传props, 我们用的是antd的Select，但是我们在interface中只定义了这四种props，如果使用这个组件的人需要用到别的Select prop了呢？
不应该每次都重新定义，这样很麻烦，如果用户想传别的属性，我们应该透传到这个组件中，应该拿到所有的Select类型集合，一起传进去;
用一个React utility tool
*/

type SelectProps = React.ComponentProps<typeof Select>;

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
