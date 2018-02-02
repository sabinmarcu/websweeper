// @flow

import React from 'react';

export default ({ state, clickHandler }: {
    state: "default" | "flagged" | "bombed" | "revealed",
    clickHandler: Function,
}) => <div onClick={clickHandler} className={state} />;