import { configure, addDecorator } from '@storybook/react';
import { withThemes } from 'storybook-styled-components';

const loadStories = () => {
    const ctx = require.context('../src', true, /\.story\.jsx?$/);
    const stories = ctx.keys().filter(path => path.indexOf('lib') >= 0);
    stories.forEach(story => ctx(story));
}

import themes from '../src/config/themes';
console.log(themes);
addDecorator(withThemes(Object.values(themes).reduce((prev, it) => {
  prev[it.name] = it.theme;
  return prev;
}, {})));

configure(loadStories, module);
