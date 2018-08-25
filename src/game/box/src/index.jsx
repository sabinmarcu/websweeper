// @flow

import React from 'react';
import styled from 'styled-components';

export const missingClickHandler = () => {
    throw new Error('Required!');
};

const Box = styled.div`
  display: inline-block;
  min-width: 50px;
  min-height: 50px;
  height: ${({ height }) => height || 50}px;
  width: ${({ width }) => width || 50}px;
  background: ${({ theme: { fg, states }, state }) =>
    state && states && states[state] || fg || '#fff'};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  margin: ${({ margin }) => margin || 5}px;
`;

const component = ({ state, onClick }: {
    state: "default" | "flagged" | "bombed" | "revealed",
    onClick: Function,
}) => <Box onClick={onClick} state={state} />;

component.defaultProps = {
    state: 'default',
    onClick: missingClickHandler,
};

export default component;
