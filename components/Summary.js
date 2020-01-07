import React, { useState } from 'react'
import _ from 'lodash'
import Flex from './Flex'
import Box from './Box'
import BlueOak from './BlueOakBox'
import ReactTooltip from 'react-tooltip'
import Text from './Text'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import List from './UnorderedList'

const Summary = ({ dependencies }) => {
  let colors = dependencies.map(d => {
    return d.licenses.map(({ color }) => {
      return { name: d.name, color }
    })
  })

  let licenses = dependencies.map(d => {
    return d.licenses.map(l => {
      return { license: l.license || 'Unknown', name: d.name }
    })
  })

  let flat = _.flatten(licenses)
  let ordered = _.groupBy(flat, 'license')
  let u = _.flatten(colors)

  return (
    <Box>
      <Box mt={2}>
        <Flex flexWrap='wrap'>
          {u.map(({ color, name }, i) => (
            <BlueOak
              key={i}
              mr={1}
              mb={1}
              borderRadius={4}
              width={20}
              height={20}
              rating={color}
              position='relative'
              data-tip={name}
            />
          ))}
        </Flex>
        <ReactTooltip className='tooltip' effect='solid' />
      </Box>
      <Box my={3}>
        {Object.entries(ordered).map(([k, v], i) => (
          <Box mb={2} key={i}>
            <Flex flexWrap='wrap'>
              <LicenseToggle v={v} k={k}>
                <List>
                  {v.map((item, i) => (
                    <li key={i}>
                      <Text>{item.name}</Text>
                    </li>
                  ))}
                </List>
              </LicenseToggle>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Summary

const LicenseToggle = props => {
  let [hidden, setHidden] = useState(true)
  return (
    <Box>
      <Box
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setHidden(!hidden)
        }}
      >
        <Flex flexWrap='wrap'>
          <Box mr={1}>
            <Text fontWeight='bold'>{props.k}</Text>
          </Box>
          <Box mr={2}>- {props.v.length}</Box>
          <Box pt={1}>{hidden ? <FiChevronDown /> : <FiChevronUp />}</Box>
        </Flex>
      </Box>
      {!hidden && props.children}
    </Box>
  )
}
