/** @tsx tsx */
import React from 'react';
import posed, { PoseGroup } from 'react-pose';


import './BlockContainer.css';

import { ColorBlock } from '../../components/UI/ColorBlock';

const Container = posed.div({
    open: {
        delayChildren: 200,
        staggerChildren: 100,
        zIndex: 99
    },
    closed: {
        delay: 150,
        delayChildren: 200,
        staggerChildren: 100,
        zIndex: 0
    },
    next: {
        delayChildren: 100,
        staggerChildren: 100
    },
    previous: {
        delayChildren: 200,
        staggerChildren: 100
    }
});

const Item = posed.div({
    open: { y: 0, opacity: 1 },
    closed: { y: 75, opacity: 0 },
    next: { y: -150, opacity: 0 },
    previous: { y: 150, opacity: 0 },
});

export function BlockContainer(props: BlockContainerProps) {
    const colorPatches = props.colors.map((e: any) => {
        return (
            <Item className="item" key={e.name}>
                <ColorBlock name="test" color={e.hex} />
            </Item>
        )
    })
    return (
        <Container className="color-container" pose={props.animationState} >
            <PoseGroup onRest={props.animationCallback}>
                {colorPatches}
            </PoseGroup>
        </Container>
    )
}

interface BlockContainerProps {
    children?: React.ReactNode;
    colors?: any;
    animationState?: any;
    animationCallback?: any;
};