import './Expandable.css';
import React from 'react';

const icon = (
  <svg width='20' height='20'>
    <circle
      cx='10'
      cy='10'
      r='8'
      stroke='green'
      stroke-width='1'
      fill='yellow'
    />
  </svg>
);

class ExpandableRow extends React.Component<any, any> {
  state = {
    isExpanded: false,
    subs: [],
  };

  static defaultProps: Readonly<any> = {
    name: 'Cenozoic',
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
    subs: [
      {
        name: 'Quaternary',
        source: 1,
        reservoir: {
          clastics: 25,
          carbonates: 8,
        },
        hydrocarbon: {
          gas: 1,
          oil: 5,
        },
      },
      {
        name: 'Neogene',
        source: 1,
        reservoir: {
          clastics: 25,
          carbonates: 8,
        },
        hydrocarbon: {
          gas: 1,
          oil: 5,
        },
      },
    ],
  };

  offset = this.props.offset.map((item: any) => (
    <div
      style={{
        width: `calc(${this.props.margin} * ${this.props.multiplier}`,
        background: this.color,
      }}
    />
  ));

  colors = ['pink', 'lightsteelblue', 'green', 'lightgreen', 'lightgrey'];

  chooseRandomColor = () =>
    this.colors[Math.floor(Math.random() * this.colors.length)];

  onClickExpand = () => {
    if (this.state.isExpanded) {
      this.setState({
        subs: [],
      });
    } else {
      this.setState({
        subs: this.props.subs.map((sub: any) => (
          <ExpandableRow
            margin={'8px'}
            backgroundColor={this.chooseRandomColor}
            name={sub.name}
            reservoir={sub.reservoir}
            hydrocarbon={sub.hydrocarbon}
            multiplier={this.props.multiplier + 1}
            offset={this.props.offset.concat(
              <div
                style={{ width: this.props.margin, background: this.color }}
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

  color = this.chooseRandomColor();

  render() {
    return (
      <div
        style={{
          background: this.color,
        }}>
        <div className='table-row'>
          <div className='table-col-1'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              {this.props.offset}
              <div
                className='table-cell-flex--vertical'
                style={{ height: '64px' }}>
                <div style={{ fontSize: '1.2em' }}>
                  <div>
                    <button onClick={this.onClickExpand}>
                      {this.state.isExpanded ? '[ - ]' : '[ + ]'}
                    </button>
                    {this.props.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='table-col-2'>
            <div className='table-cell-flex--vertical'>
              <div>{icon}</div>
              <div>{this.props.source}</div>
            </div>
          </div>
          <div className='table-col-3 table-cell-flex--horizontal'>
            <div className='table-cell-flex--vertical'>
              <div>{icon}</div>
              <div>{this.props.reservoir.clastics}</div>
            </div>
            <div className='table-cell-flex--vertical'>
              <div>{icon}</div>
              <div>{this.props.reservoir.carbonates}</div>
            </div>
          </div>
          <div className='table-col-4 table-cell-flex--horizontal'>
            <div className='table-cell-flex--vertical'>
              <div>{icon}</div>
              <div>{this.props.hydrocarbon.gas}</div>
            </div>
            <div className='table-cell-flex--vertical'>
              <div>{icon}</div>
              <div>{this.props.hydrocarbon.oil}</div>
            </div>
          </div>
        </div>
        {this.state.subs}
        <div className='table-row'>
          {this.props.offset.concat(
            <div
              style={{
                background: this.color,
                height: this.state.isExpanded ? '8px' : undefined,
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ExpandableRow;
