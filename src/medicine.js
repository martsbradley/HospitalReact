import React from 'react'
import PropTypes from 'prop-types';

export default class Medicine extends React.Component {

    render()  {
        let detail = <tr></tr>

        const meds = this.props.meds;
        if (meds) {

            detail = meds.map(p =>
              <tr className={this.props.selectedMedicine === p.id? "selected": ""}
                   onClick={() => this.props.mouseClicked(p)} key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.manufacturer}</td>
              </tr>)
        }

        let selectAble = 'table table-border selectabletable';

        if (this.props.mouseDisabled) {
            selectAble= 'table table-border';
        }

        const table = (<table className={selectAble}>
            
          <thead className=''>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Manufacturer</th>
            </tr>
          </thead>
          <tbody>{detail}</tbody></table>)
        return table
    }
}
Medicine.propTypes = {
    meds : PropTypes.array,
    selectedMedicine: PropTypes.number,
    mouseClicked: PropTypes.func,
    mouseDisabled: PropTypes.bool,
}
