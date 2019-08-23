import React from 'react'
import PropTypes from 'prop-types'

const VariantSelector = props => {
  const { option } = props
  return (
    <div className="col-6">
      <div className="form-group">
        <label htmlFor={option.name}>{option.name} </label>
        <select
          className="form-control"
          id={option.id}
          name={option.name}
          key={option.id}
          onChange={props.onChange}
        >
          {option.values.map(value => {
            return (
              <option
                value={value}
                key={`${option.name}-${value}`}
              >{`${value}`}</option>
            )
          })}
        </select>
        <br />
      </div>
    </div>
  )
}

VariantSelector.propTypes = {
  onChange: PropTypes.func,
  option: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default VariantSelector
