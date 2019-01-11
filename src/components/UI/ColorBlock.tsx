/** @tsx tsx */
import React from 'react';
import styled from '@emotion/styled';
// Import styles
import './ColorBlock.css';
import SliderContainer from '../../containers/SliderContainer/SliderContainer';


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
    const handleClick = () => {
        console.log('clicked');
        
        props.handleColorUpdate(props.palette, props.id, "#FFFFFF");
    }
    return (
        <div className="color-patch-container">
            <Box
                className="color-patch"
                onClick={handleClick}
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
    palette?: any;
    id?: string;
    handleColorUpdate?: any;
};

