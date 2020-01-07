import React from 'react'
import Text from '../components/Text'
import Box from './Box'
import {
  layout,
  space,
  shadow,
  position,
  color,
  typography,
  border
} from 'styled-system'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import propTypes from '@styled-system/prop-types'
import PropTypes from 'prop-types'

const StyledTextArea = styled.textarea`
  outline: 0;
  box-sizing: border-box;
  border: none;
  &:focus {
    border: 1px solid #357edd;
  }
  ${props =>
    props.error &&
    css`
      border: 1px solid red;
    `};
    ${layout}
    ${space}
    ${shadow}
    ${position}
    ${color}
    ${border}
    ${typography}
`
class TextArea extends React.Component {
  render () {
    const {
      label,
      type,
      placeholder,
      name,
      handleChange,
      value,
      error,
      onFocus,
      onBlur,
      readOnly,
      autoComplete
    } = this.props

    return (
      <Box borderRadius={2}>
        {label && (
          <Box mb={2}>
            <Text>
              <label htmlFor={value}>{label}</label>
            </Text>
          </Box>
        )}
        <StyledTextArea
          autoComplete={autoComplete}
          id={value}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          error={error}
          {...this.props}
        />
      </Box>
    )
  }
}

TextArea.defaultProps = {
  width: 1,
  border: '1px solid',
  borderColor: '#D6D7DE',
  fontSize: 2,
  p: 1
}

TextArea.propTypes = {
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.color,
  ...propTypes.typography,
  ...propTypes.layout,
  ...propTypes.position,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

export default TextArea
