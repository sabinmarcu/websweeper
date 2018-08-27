import React from 'react';
import { storiesOf } from '@storybook/react';
import Game from './index';

storiesOf('Game Board', module)
  .add('Default State', () => (
    <section>
      <Game width={ 5 } height={ 3 } />
    </section>
  ));
