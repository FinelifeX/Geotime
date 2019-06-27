import React from 'react';
import './Table.css';
import ExpandableRow from './expandable/ExpandableRow';
import geotime from '../data/geotime';

const Table: React.FC = props => {
  const geodata = geotime.map(item => (
    <ExpandableRow name={item.text} subs={item.children} />
  ));
  return (
    <div className='table-container'>
      <div className='table-row'>
        <div
          className='table-header table-col-1'
          style={{ background: 'transparent' }}
        />
        <div className='table-header table-col-2'>
          <h2>Source</h2>
        </div>
        <div className='table-header table-col-3 table-cell-flex--vertical'>
          <div>
            <h2>Reservoir</h2>
          </div>
          <div className='table-cell-flex--horizontal'>
            <div>
              <h3>Clastics</h3>
            </div>
            <div>
              <h3>Carbonates</h3>
            </div>
          </div>
        </div>
        <div className='table-header table-col-4 table-cell-flex--vertical'>
          <div>
            <h2>Hydrocarbon</h2>
          </div>
          <div className='table-cell-flex--horizontal'>
            <div>
              <h3>Gas</h3>
            </div>
            <div>
              <h3>Oil</h3>
            </div>
          </div>
        </div>
      </div>
      {geodata}
    </div>
  );
};

export default Table;
