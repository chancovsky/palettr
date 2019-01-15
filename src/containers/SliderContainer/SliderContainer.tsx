/** @tsx tsx */
import React from 'react';
import './SliderContainer.css';
import { BlockContainer } from '../BlockContainer/BlockContainer';
import defaultData from '../../data/color-data.json';
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
      updateNum: 0,
      editMode: false
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleColorUpdate = this.handleColorUpdate.bind(this);
    this.handleAddPalette = this.handleAddPalette.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidMount() {
    this.initializeData();
  }

  initializeData(): void {
    if (localStorage.getItem('collections') === null) {
      console.log('no saved data');
      const collection = new Collection(defaultData.colorData);
      this.setState({
        collection: collection
      });
    } else {
      const storedCollection = localStorage.getItem('collections');
      const collectionJson = JSON.parse(storedCollection || '');
      let collection = new Collection(collectionJson.palettes);
      this.setState({
        collection: collection
      });
    }
  }

  saveData(): void {
    // const save = electron.ipcRenderer.sendSync('saveFile', this.state.collection);
    localStorage.setItem('collections', JSON.stringify(this.state.collection));
    console.log('save');
  }

  handleColorUpdate(palette: any, id: string, color: string): void {
    palette.updateColor(id, color);
    this.saveData();
    this.forceUpdate();
  }

  handleRemove(): void {
    this.state.collection.removeCollection(this.state.curPos);
    console.log(this.state);
    this.forceUpdate(() => {
      const newPos = this.state.collection.palettes.length - 1;
      this.setState({
        curPos: newPos
      });
      this.saveData();
    });
  }

  handleAddPalette(): void {
    this.state.collection.addCollection();
    this.forceUpdate(() => {
      const newPos = this.state.collection.palettes.length - 1;
      this.setState({
        curPos: newPos
      });
      this.saveData();
    });
  }

  handleNext(e: any) {
    this.state.collection.palettes.length - 1 === this.state.curPos
      ? this.setState({
          curPos: 0
        })
      : this.setState({
          curPos: this.state.curPos + 1
        });
  }

  handlePrevious(e: any) {
    this.state.curPos === 0
      ? this.setState({
          curPos: this.state.collection.palettes.length - 1
        })
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
    const removeIcon = (
      <path
        fill="currentColor"
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"
      />
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
          <div className="icon" onClick={this.handleRemove}>
            <svg
              viewBox="0 0 496 496"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {removeIcon}
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
  editMode: boolean;
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
