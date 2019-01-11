/** @tsx tsx */
import React from 'react';
import './SliderContainer.css';

import { BlockContainer } from '../BlockContainer/BlockContainer';

import data from '../../data/color-data.json';

export default class SliderContainer extends React.Component<SliderContainerProps, SliderContainerState> {
    constructor(props: SliderContainerProps) {
        super(props);
        this.state = {
            colorData: data.colorData,
            curPos: 0,
        }

        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }
    componentDidMount() {

    }

    handleNext(e: any) {
        this.state.colorData.length - 1 === this.state.curPos ? false :
            this.setState({
                curPos: this.state.curPos + 1
            })
    }

    handlePrevious(e: any) {
        this.state.curPos === 0 ? false :
            this.setState({
                curPos: this.state.curPos - 1
            })
    }

    render() {

        const collections = this.state.colorData.map((e: any, index: number) => {
            let aniState = 'closed';
            if (index === this.state.curPos) {
                aniState = 'open';
            } else if (index === this.state.curPos + 1) {
                aniState = 'next'
            } else if (index === this.state.curPos - 1) {
                aniState = 'previous'
            }
            console.log(aniState);
            return (
                <BlockContainer key={e.name} animationState={aniState} colors={e.colors} />
            )
        })
        return (
            <div className="container-main">
                {collections}
                <div className="container-control">
                    <div className="icon" onClick={this.handleNext}>
                        <svg aria-hidden="true" data-prefix="fas" data-icon="chevron-circle-up" className="svg-inline--fa fa-chevron-circle-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"></path></svg>
                    </div>
                    <div className="icon" onClick={this.handlePrevious}>
                        <svg aria-hidden="true" data-prefix="fas" data-icon="chevron-circle-down" className="svg-inline--fa fa-chevron-circle-down fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"></path></svg>
                    </div>
                </div>
            </div>
        )
    }
}

interface SliderContainerState {
    children?: React.ReactNode;
    colors?: any;
    animationState?: any;
    animationCallback?: any;
    colorData?: any;
    curPos: number;
};

interface SliderContainerProps {
    children?: React.ReactNode;
    colors?: any;
    animationState?: any;
    animationCallback?: any;
};

