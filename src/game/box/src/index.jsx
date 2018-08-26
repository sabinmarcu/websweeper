// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import flag from './assets/flag.svg';
import mine from './assets/mine.svg';

export const missingClickHandler = () => {
    throw new Error('Required!');
};

const defaultSize = 50;
const iconPercent = 60;

const Box = styled.div`
  display: inline-block;
  min-width: ${({ size }) => size || defaultSize}px;
  min-height: ${({ size }) => size || defaultSize}px;
  height: ${({ size }) => size || defaultSize}px;
  width: ${({ size }) => size || defaultSize}px;
  background: ${({ theme: { fg, states }, state }) =>
    state && states && states[state] || fg || '#fff'};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  margin: ${({ margin }) => margin || 5}px;
  position: relative;

  svg {
    fill: currentColor;
  }
`;

const symbolShapes = {
  'default': '',
  'revealed': '',
  'flagged': flag,
  'bombed': mine,
}

const symbolStyles = {
  'default': '',
  'revealed': '',
  'flagged': `
    color: white;
  `,
  'bombed': '',
}

const Symbol = styled.div`
  position: absolute;
  left: ${({ size }) => (size || defaultSize) * (100 - iconPercent) / 200}px;
  top: ${({ size }) => (size || defaultSize) * (100 - iconPercent) / 200}px;
  width: ${({ size }) => (size || defaultSize) * iconPercent / 100}px;
  height: ${({ size }) => (size || defaultSize) * iconPercent / 100}px;

  ${({ state }) => symbolStyles[state]}
`

const withFetchIcon = (ComposedComponent: any): any =>
    class FetcherComponent extends Component<{
        icon: ?string,
      }, {
        icon: string,
      }> {
      state = {}
      componentWillMount() {
        if (this.props.icon) {
          this.fetchIcon(this.props.icon);
        }
      }
      componentWillReceiveProps(props) {
        if (props.icon !== this.props.icon) {
          this.fetchIcon(props.icon);
        }
      }
      fetchIcon = (icon: string): Promise<void> =>
        fetch(icon)
          .then((res: Response) => res.text())
          .then((icon: string) => this.setState({ icon }));
      render() {
        const { icon } = this.state;
        const { icon: propIcon, ...rest } = this.props;
        return (
          <ComposedComponent
            {...rest}
            dangerouslySetInnerHTML={{__html: icon }}
          />
        );
      }
    }

const IconSymbol = withFetchIcon(Symbol);

const component = ({ state, onClick, size }: {
    state: "default" | "flagged" | "bombed" | "revealed",
    onClick: Function,
    size: ?number,
}) => (
  <Box onClick={onClick} state={state} size={size}>
    <IconSymbol state={state} size={size} icon={symbolShapes[state]} />
  </Box>
);

component.defaultProps = {
    state: 'default',
    onClick: missingClickHandler,
};

export default component;
