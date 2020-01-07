import styled, { css } from '@emotion/styled'
import Text from './Text'

const BlueOak = styled(Text.span)`
  background: #ff4136;
  ${props =>
    props.rating === 'Model' &&
    css`
      background: #137752;
    `};

  ${props =>
    props.rating === 'Gold' &&
    css`
      background: #19a974;
    `};
  ${props =>
    props.rating === 'Silver' &&
    css`
      background: #19a974;
    `};
  ${props =>
    props.rating === 'Bronze' &&
    css`
      background: #ff6300;
    `};
  ${props =>
    props.rating === 'Lead' &&
    css`
      background: #ff725c;
    `};
`

export default BlueOak
