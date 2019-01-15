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
`;

export class ColorBlock extends React.Component<ColorBlockProps, ColorBlockState> {
  constructor(props: ColorBlockProps) {
    super(props);
    this.state = {
      inputValue: props.color
    }
  }
  copyToClipboard = (str = this.props.color) => {
    const el = document.createElement('textarea');
    el.value = typeof str !== 'undefined' ? str : '#FFFFFF';
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  handleClick = () => {
    this.copyToClipboard(this.props.color);
    const copyNotification = new Notification('Palettr', {
      body: `Color ${this.props.color} Copied!`
    })
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value
    })
    this.props.handleColorUpdate(this.props.palette, this.props.id, e.target.value);
  }

  render() {
    return (
      <div className="color-patch-container">
        <Box className="color-patch" onClick={this.handleClick} color={this.props.color} />
        <input className="block-input" type="test" value={this.state.inputValue} onChange={this.handleChange}></input>
      </div>
    )
  }
}


// export function ColorBlock(props: ColorBlockProps) {
//   let inputVal = props.color;
//   const copyToClipboard = (str = props.color) => {
//     const el = document.createElement('textarea');
//     el.value = typeof str !== 'undefined' ? str : '#FFFFFF';
//     el.setAttribute('readonly', '');
//     el.style.position = 'absolute';
//     el.style.left = '-9999px';
//     document.body.appendChild(el);
//     el.select();
//     document.execCommand('copy');
//     document.body.removeChild(el);
//   };
//   const handleClick = () => {
//     console.log('clicked');
//     copyToClipboard(props.color);
//     // props.handleColorUpdate(props.palette, props.id, '#FFFFFF');
//   };

//   const handleChange = (e: any) => {
//     console.log(e.target.value);
//     inputVal = e.target.value;

//   }
//   return (
//     <div className="color-patch-container">
//       <Box className="color-patch" onClick={handleClick} color={props.color} />
//       <input className="block-input" type="test" value={inputVal} onChange={handleChange}></input>
//     </div>
//   );
// }

interface ColorBlockProps {
  children?: React.ReactNode;
  color?: string;
  handleClick?: any;
  name?: string;
  palette?: any;
  id?: string;
  handleColorUpdate?: any;
}

interface ColorBlockState {
  inputValue?: string;
}
