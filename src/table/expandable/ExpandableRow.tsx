import './Expandable.css';
import React from 'react';
import icsColors from '../../data/chrono-colors';

function transparentizeColor(hexValue: string) {
  const bigInt = parseInt(hexValue.slice(1), 16);
  let rgbaString = 'rgba(';
  rgbaString += ((bigInt >> 16) & 255) + ', ';
  rgbaString += ((bigInt >> 8) & 255) + ', ';
  rgbaString += (bigInt & 255) + ', 0.4)';
  console.log(rgbaString);
  return rgbaString;
}

const iconYellowCircle = (
  <svg width='50' height='50'>
    <circle
      cx='25'
      cy='25'
      r='12'
      stroke='goldenrod'
      strokeWidth='2'
      fill='yellow'
    />
  </svg>
);

const iconGreenCircle = (
  <svg width='50' height='50'>
    <circle
      cx='25'
      cy='25'
      r='12'
      stroke='green'
      strokeWidth='2'
      fill='lightgreen'
    />
  </svg>
);

const iconBlueCircle = (
  <svg width='50' height='50'>
    <circle
      cx='25'
      cy='25'
      r='12'
      stroke='darkblue'
      strokeWidth='2'
      fill='blue'
    />
  </svg>
);

const iconGreyCircle = (
  <svg width='50' height='50'>
    <circle cx='25' cy='25' r='12' stroke='black' strokeWidth='2' fill='gray' />
  </svg>
);

const iconSquare = (
  <svg width='50' height='50'>
    <rect
      x='15'
      y='15'
      width='20'
      height='20'
      fill='violet'
      stroke='darkviolet'
      strokeWidth='2'
      transform='rotate(45 25 25)'
    />
  </svg>
);

class ExpandableRow extends React.Component<any, any> {
  state = {
    isExpanded: false,
    subs: [],
  };

  static defaultProps: Readonly<any> = {
    name: 'Unknown',
    source: 1,
    reservoir: {
      clastics: 25,
      carbonates: 8,
    },
    hydrocarbon: {
      gas: 1,
      oil: 5,
    },
    multiplier: 0,
    margin: '8px',
    offset: [],
    subs: [],
  };

  offset = this.props.offset.map((item: any) => (
    <div
      style={{
        width: `calc(${this.props.margin} * ${this.props.multiplier}`,
        background: this.backgroundColor,
      }}
    />
  ));

  backgroundColor = icsColors[this.props.name][0];
  textColor = icsColors[this.props.name][1];
  dataCellBackgroundColor = transparentizeColor(this.backgroundColor);

  onClickExpand = () => {
    if (this.state.isExpanded) {
      this.setState({
        subs: [],
      });
    } else {
      this.setState({
        subs: this.props.subs.map((sub: any) => (
          <ExpandableRow
            margin={this.props.margin}
            name={sub.text}
            subs={sub.children}
            multiplier={this.props.multiplier + 1}
            offset={this.props.offset.concat(
              <div
                style={{
                  width: this.props.margin,
                  background: this.backgroundColor,
                }}
              />
            )}
          />
        )),
      });
    }
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  render() {
    console.log(this.props.subs);

    return (
      <div
        style={{
          color: this.textColor,
        }}>
        <div className='table-row'>
          <div
            className='table-col-1'
            style={{ background: this.backgroundColor }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              {this.props.offset}
              <div
                className='table-cell-flex--vertical'
                style={{ height: '64px', padding: '8px' }}>
                <div style={{ fontSize: '1.6em', fontWeight: 'bold' }}>
                  <div>
                    {this.props.subs.length > 0 ? (
                      <button
                        onClick={this.onClickExpand}
                        style={{ color: this.textColor }}>
                        {this.state.isExpanded ? '[ - ]' : '[ + ]'}
                      </button>
                    ) : null}{' '}
                    <span>{this.props.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className='table-col-2'
            style={{
              borderColor: this.backgroundColor,
              backgroundColor: this.dataCellBackgroundColor,
            }}>
            <div className='table-cell-flex--vertical'>
              <div>{iconSquare}</div>
              <div>
                <a href='/'>{this.props.source}</a>
              </div>
            </div>
          </div>
          <div
            className='table-col-3 table-cell-flex--horizontal'
            style={{
              borderColor: this.backgroundColor,
              background: this.dataCellBackgroundColor,
            }}>
            <div className='table-cell-flex--vertical'>
              <div>{iconYellowCircle}</div>
              <div>
                <a href='/'>{this.props.reservoir.clastics}</a>
              </div>
            </div>
            <div className='table-cell-flex--vertical'>
              <div>{iconBlueCircle}</div>
              <div>
                <a href='/'>{this.props.reservoir.carbonates}</a>
              </div>
            </div>
          </div>
          <div
            className='table-col-4 table-cell-flex--horizontal'
            style={{
              borderColor: this.backgroundColor,
              background: this.dataCellBackgroundColor,
            }}>
            <div className='table-cell-flex--vertical'>
              <div>{iconGreenCircle}</div>
              <div>
                <a href='/'>{this.props.hydrocarbon.gas}</a>
              </div>
            </div>
            <div className='table-cell-flex--vertical'>
              <div>{iconGreyCircle}</div>
              <div>
                <a href='/'>{this.props.hydrocarbon.oil}</a>
              </div>
            </div>
          </div>
        </div>
        {this.state.subs}
        <div className='table-row'>
          {this.props.offset.concat(
            <div
              style={{
                background: this.backgroundColor,
                height: this.state.isExpanded ? '10px' : undefined,
                width: '100%',
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ExpandableRow;
