import React from 'react';

import { css } from '@emotion/react';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';

import theme from '@/styles/theme';

type Item = {
  value: string;
  label: string;
};

interface SelectBoxProps {
  items: Item[];
}

const SelectBox: React.FC<SelectBoxProps> = ({ items }: SelectBoxProps) => (
  <Select.Root>
    <Select.Trigger css={SelectTrigger}>
      <Select.Value placeholder='선택하세요.' />
      <Select.Icon css={TriggerIcon}>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content
        css={SelectContent}
        position='popper' // 현재 화면에 맞춰 위치 자동 조정
        side='bottom' // Trigger 하단에 표시
        align='center' // 중앙정렬
        sideOffset={5} // Trigger와 gap 5px
        collisionPadding={0} // 화면 좌측에 붙임
      >
        <Select.Viewport css={SelectViewport}>
          <Select.Group>
            {items.map((item) => (
              <Select.Item key={item.value} value={item.value} css={SelectItem}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator css={SelectItemIndicator}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectTrigger = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 4px;
  background-color: ${theme.colors.black};
  border: 1px solid ${theme.colors.bgSwitchOff};
  color: ${theme.colors.white};
  cursor: pointer;
  width: 106px;
  height: ${theme.heights.short};
  font-size: ${theme.fontSizes.small};
`;

const TriggerIcon = css`
  display: flex;
  color: ${theme.colors.darkGray};
`;

const SelectContent = css`
  z-index: 1;
  width: 106px;
`;

const SelectViewport = css`
  border: 1px solid ${theme.colors.bgSwitchOff};
  border-radius: 4px;
  background-color: ${theme.colors.black};
`;

const SelectItem = css`
  display: flex;
  align-items: center;
  outline: 0;
  padding: 7px;
  margin: 5px;
  font-size: ${theme.fontSizes.small};

  &:hover {
    background-color: ${theme.colors.tertiary};
    border-radius: 4px;
  }
`;

const SelectItemIndicator = css`
  display: flex;
  padding-left: 5px;
`;

export default SelectBox;
