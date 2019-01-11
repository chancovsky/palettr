/** @tsx tsx */
import React from 'react';
import './SliderContainer.css';

import { BlockContainer } from '../BlockContainer/BlockContainer';

import data from '../../data/color-data.json';

import Palette from '../../API/Palette';

import Collection from '../../API/Collection';

export default class SliderContainer extends React.Component<
  SliderContainerProps,
  SliderContainerState
> {
  constructor(props: SliderContainerProps) {
    super(props);
    this.state = {
      collection: {
        palettes: []
      },
      curPos: 0,
      updateNum: 0
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleColorUpdate = this.handleColorUpdate.bind(this);
    this.handleAddPalette = this.handleAddPalette.bind(this);
  }
  componentDidMount() {
    this.initializeData();
  }

  initializeData(): void {
    const collection = new Collection(data);
    this.setState({
      collection: collection
    });
  }

  handleColorUpdate(palette: any, id: string, color: string): void {
    palette.updateColor(id, color);
    this.forceUpdate();
  }

  handleAddPalette(): void {
    this.state.collection.addCollection('test');
    this.forceUpdate(() => {
      const newPos = this.state.collection.palettes.length - 1;
      this.setState({
        curPos: newPos
      });
    });
  }

  handleNext(e: any) {
    this.state.collection.palettes.length - 1 === this.state.curPos
      ? false
      : this.setState({
          curPos: this.state.curPos + 1
        });
  }

  handlePrevious(e: any) {
    this.state.curPos === 0
      ? false
      : this.setState({
          curPos: this.state.curPos - 1
        });
  }

  render() {
    const collections = this.state.collection.palettes.map(
      (e: any, index: number) => {
        let aniState = 'closed';
        if (index === this.state.curPos) {
          aniState = 'open';
        } else if (index === this.state.curPos + 1) {
          aniState = 'next';
        } else if (index === this.state.curPos - 1) {
          aniState = 'previous';
        }
        return (
          <BlockContainer
            key={e.name}
            animationState={aniState}
            palette={e}
            handleColorUpdate={this.handleColorUpdate}
          />
        );
      }
    );
    return (
      <div className="container-main">
        {collections}
        <div className="container-control">
          <div className="icon" onClick={this.handleNext}>
            <svg
              aria-hidden="true"
              data-prefix="fas"
              data-icon="chevron-circle-up"
              className="svg-inline--fa fa-chevron-circle-up fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"
              />
            </svg>
          </div>
          <div className="icon" onClick={this.handlePrevious}>
            <svg
              aria-hidden="true"
              data-prefix="fas"
              data-icon="chevron-circle-down"
              className="svg-inline--fa fa-chevron-circle-down fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"
              />
            </svg>
          </div>
        </div>
        <div className="add-container-control">
          <div className="icon" onClick={this.handleAddPalette}>
            <svg
              aria-hidden="true"
              data-prefix="fas"
              data-icon="plus-circle"
              className="svg-inline--fa fa-plus-circle fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

interface SliderContainerState {
  children?: React.ReactNode;
  collection?: any;
  animationState?: any;
  animationCallback?: any;
  colorData?: any;
  curPos: number;
  updateNum: number;
}

interface SliderContainerProps {
  children?: React.ReactNode;
  colors?: any;
  animationState?: any;
  animationCallback?: any;
}

interface UpdateDataInterface {
  id: string;
  name: string;
  group: string;
  color_id: string;
  value: string;
}
