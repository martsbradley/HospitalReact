import React from 'react'
import PropTypes from 'prop-types';

export default class Medicine extends React.Component {

    render()  {
        let detail = <tr></tr>

        const meds = this.props.meds;
        if (meds) {

            detail = meds.map(p =>
              <tr className={this.props.selectedMedicine === p.id? "selected": ""}
                   onClick={() => this.props.mouseClicked(p.id)} key={p.id}>
                <td className="d-none d-sm-table-cell">{p.id}</td>
                <td>{p.name}</td>
                <td className="d-none d-lg-table-cell">{p.manufacturer}</td>
              </tr>)
        }

        const table = (<table className='table table-border '>
            
          <thead className=''>
            <tr>
              <th scope="col" className="d-none d-sm-table-cell">Id</th>
              <th scope="col">Name</th>
              <th scope="col" className="d-none d-lg-table-cell">Manufacturer</th>
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
}
