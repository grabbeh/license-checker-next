import React from 'react'
import ReactTooltip from 'react-tooltip'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'
import { FaQuestionCircle } from 'react-icons/fa'

const Scoped = ({ scoped }) => (
  <Box>
    {scoped && (
      <Flex justifyContent='flex-end'>
        <Box p={1} bg='red'>
          <Flex flexWrap='wrap'>
            <Text fontSize={1} mr={1} color='white'>
              Scoped
            </Text>
            <FaQuestionCircle
              style={{ fontSize: 10, color: 'white' }}
              data-tip="This dependency is scoped meaning we can't get data from NPM unfortunately"
            />
          </Flex>
        </Box>

        <ReactTooltip className='tooltip' effect='solid' />
      </Flex>
    )}
  </Box>
)

export default Scoped
