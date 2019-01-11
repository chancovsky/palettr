/** @tsx tsx */
import React from 'react';
import styled from '@emotion/styled';
// Import styles
import './ColorBlock.css';


import posed from 'react-pose';

const BoxProps = {
    pressable: true,
    hoverable: true,
    init: { scale: 1, y: 0 },
    press: { scale: 1, y: 3 },
    hover: { scale: 1, y: -3 }
};


const Box = styled(posed.div(BoxProps))`
  background: ${props =>
        typeof props.color !== 'undefined' ? props.color : 'turquoise'};
`

export function ColorBlock(props: ColorBlockProps) {
    return (
        <div className="color-patch-container">
            <Box
                className="color-patch"
                onClick={props.handleClick}
                color={props.color}
            >
            </Box>
        </div>
    )
}

interface ColorBlockProps {
    children?: React.ReactNode;
    color?: string;
    handleClick?: any;
    name?: string;
};

