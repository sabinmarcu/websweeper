// @flow

import React from 'react';
import styled from 'styled-components';

import Box from '@websweeper/box';

export default ({
  width,
  height,
}: {
  width: number,
  height: number,
}): any => (
  <section>
    {[...Array(height).keys()].map((row: number) => (
      <section key={row}>
        {[...Array(width).keys()].map((column: number) => (
          <Box key={`${row}-${column}`} />
        ))}
      </section>
    ))}
  </section>
)
