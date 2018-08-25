// @flow

import React from 'react';

export const missingClickHandler = () => {
    throw new Error('Required!');
};

const component = ({ state, clickHandler }: {
    state: "default" | "flagged" | "bombed" | "revealed",
    clickHandler: Function,
}) => <div onClick={clickHandler} className={state} />;

component.defaultProps = {
    state: 'default',
    clickHandler: missingClickHandler,
};

export default component;
