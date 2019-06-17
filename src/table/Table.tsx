import React from 'react';
import './Table.css';
import ExpandableRow from './expandable/ExpandableRow';

const Table: React.FC = props => {
  return (
    <div className='table-container'>
      <div className='table-row'>
        <div
          className='table-header table-col-1'
          style={{ background: 'transparent' }}
        />
        <div className='table-header table-col-2 h1'>Source</div>
        <div className='table-header table-col-3 table-cell-flex--vertical'>
          <div className='h1'>Reservoir</div>
          <div
            className='table-cell-flex--horizontal h2'
            style={{ marginTop: '14px' }}>
            <div>Clastics</div>
            <div>Carbonates</div>
          </div>
        </div>
        <div className='table-header table-col-4 table-cell-flex--vertical'>
          <div className='h1'>Hydrocarbon</div>
          <div
            className='table-cell-flex--horizontal h2'
            style={{ marginTop: '14px' }}>
            <div>Gas</div>
            <div>Oil</div>
          </div>
        </div>
      </div>
      <ExpandableRow />
    </div>
  );
};

export default Table;
