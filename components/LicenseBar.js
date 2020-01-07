import styled, { css } from '@emotion/styled'
import Box from './Box'

const LicenseBar = styled(Box)`
  ${props =>
    props.license === 'MIT' &&
    css`
      background: #ff725c;
    `};

  ${props =>
    props.license === 'Apache-2.0' &&
    css`
      background: #e8fdf5;
    `};
  ${props =>
    props.license === 'ISC' &&
    css`
      background: #fbf1a9;
    `};
  ${props =>
    props.license === 'Public domain' &&
    css`
      background: #ff80cc;
    `};
  ${props =>
    props.license === 'BSD-2-Clause' &&
    css`
      background: #9eebcf;
    `};
  ${props =>
    props.license === 'BSD-3-Clause' &&
    css`
      background: #96ccff;
    `};
  ${props =>
    props.license === 'BSD' &&
    css`
      background: #96ccff;
    `};

  ${props =>
    props.license === undefined &&
    css`
      background: #ffffff;
    `};
`

export default LicenseBar
