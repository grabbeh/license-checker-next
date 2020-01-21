import React from 'react'
import Box from './Box'
import Text from './Text'
import Summary from './Summary'

const ResultsSideBar = ({ dependencies, name }) => {
  return (
    <Box borderRadius={3} mt={3} bg='light-gray' p={[2, 3]}>
      <Text color='black' fontSize={4} fontWeight='bold'>
        Results
      </Text>
      <Box>
        <Box mt={2}>
          <Text fontSize={2}>Main repository</Text>
        </Box>
        <Text color='black' fontWeight='bold' fontSize={4}>
          {name}
        </Text>
      </Box>
      <Box mt={2}>
        <Text fontSize={2}>Dependencies</Text>
      </Box>
      <Box>
        <Text color='black' fontWeight='bold' fontSize={4}>
          {dependencies.length}
        </Text>
      </Box>
      <Summary dependencies={dependencies} />
    </Box>
  )
}

export default ResultsSideBar
