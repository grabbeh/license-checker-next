import React from 'react'
import ReactTooltip from 'react-tooltip'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'
import { FaQuestionCircle } from 'react-icons/fa'

const Latest = ({ latest }) => (
  <Box>
    {latest && (
      <Box>
        <Box p={1} bg='dark-gray'>
          <Flex flexWrap='wrap'>
            <Text fontSize={1} mr={1} color='white'>
              Latest
            </Text>
            <FaQuestionCircle
              style={{ fontSize: 10, color: 'white' }}
              data-tip="We couldn't get information about the version listed in your package.json so we got information about the latest version"
            />
          </Flex>
        </Box>
        <ReactTooltip className='tooltip' effect='solid' />
      </Box>
    )}
  </Box>
)

export default Latest
