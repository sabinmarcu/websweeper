import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import themes from '@websweeper/themes';
import Box from './index';

const clickHandler = () => alert('Clicked!');
class CountComponent extends Component {
  state = { count: 0 }

  render() {
    const { state } = this.props;
    const { count } = this.state;
    return (
      <span>
        <Box
          state={state}
          onClick={() => this.setState({ count: count + 1 })}
        />
        <span>Clicked : {count}</span>
      </span>
    );
  }
}

class SwitchComponent extends Component {
  state = { count: 0 }

  render() {
    const { count } = this.state;
    const state = ['default', 'flagged', 'bombed', 'revealed'][count % 4];
    return (
      <span>
        <Box
          state={state}
          onClick={() => this.setState({ count: count + 1 })}
        />
        <span>State: {state}</span>
      </span>
    );
  }
}

storiesOf('Box', module)
  .add('Default States', () => (
    <section>
      {Object
        .values(themes)
        .map(({ name, theme }, index, { length }) => <section key={name}>
            <article>
              <h1>{name}</h1>
              <ThemeProvider theme={theme}>
                <article>
                  <Box />
                  <Box state="flagged" />
                  <Box state="bombed" />
                  <Box state="revealed" />
                </article>
              </ThemeProvider>
            </article>
            {index !== length - 1 && <hr />}
          </section>
        )}
    </section>
  )).add('Click Handlers', () => (<section>
    <article>
      <h1>Click handlers are attached to these guys</h1>
      <CountComponent />
      <CountComponent state="flagged" />
      <CountComponent state="bombed" />
      <CountComponent state="revealed" />
    </article>
    <hr/>
    <article>
      <h1>This guy will change state when clicked</h1>
      <SwitchComponent />
    </article>
  </section>));
