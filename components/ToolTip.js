import React from 'react'
import Box from './Box'
import styled from '@emotion/styled'
import Text from './Text'

const ToolTip = props => {
  return (
    <Parent position='relative'>
      {props.children}
      <StyledToolTip left={30} p={2} bg='black' position='absolute'>
        <Text fontWeight='bold' textAlign='center' color='white'>
          {props.name}
        </Text>
      </StyledToolTip>
    </Parent>
  )
}

const Parent = styled(Box)``

const StyledToolTip = styled(Box)`
  opacity: 0;
  ${Parent}:hover & {
    opacity: 1;
    z-index: 999;
  }
`

export default ToolTip
