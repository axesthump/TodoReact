import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {

  choiseFilter = e => {
    const btns = document.querySelectorAll('.btn-group .btn')
    const activeBtn = e.target
    btns.forEach(btn => {
      if (btn.classList.contains('btn-outline-secondary')) {
        btn.classList.remove('btn-info')
      } else {
        btn.classList.remove('btn-info')
        btn.classList.add('btn-outline-secondary')
      }
    })
    activeBtn.classList.remove('btn-outline-secondary')
    activeBtn.classList.add('btn-info')
  }

  render() {
    const { onFilter } = this.props
    return (
      <div className="btn-group">
        <button type="button"
          className="btn btn-info" onClick={(e) => {
            onFilter(e)
            this.choiseFilter(e)
          }}>All</button>
        <button type="button"
          className="btn btn-outline-secondary" onClick={(e) => {
            onFilter(e)
            this.choiseFilter(e)
          }}>Active</button>
        <button type="button"
          className="btn btn-outline-secondary" onClick={(e) => {
            onFilter(e)
            this.choiseFilter(e)
          }}>Done</button>
      </div>
    );
  }
}
