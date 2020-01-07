import React, { Fragment, useState } from 'react'
import Box from './Box'
import Text from './Text'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { FaCodeBranch, FaUserAlt } from 'react-icons/fa'
import BlueOak from './BlueOakBox'
import styled from '@emotion/styled'
import Scoped from './Scoped'
import Latest from './Latest'
import ReactTooltip from 'react-tooltip'
import Flex from './Flex'

const Dependency = ({ parent, children, scoped, latest }) => {
  let [hidden, setHidden] = useState(true)
  let { name, author, licenses, version, description } = parent
  return (
    <Fragment>
      <Box
        key={name}
        pt={2}
        pb={3}
        pl={3}
        pr={2}
        mr={[0, 3]}
        mt={3}
        bg='#f4f4f2'
        borderRadius={2}
        boxShadowSize='sm'
        position='relative'
      >
        <Flex flexWrap='wrap' justifyContent='space-between'>
          <Box width={0.6}>
            <Text
              style={{ wordWrap: 'break-word' }}
              fontSize={3}
              fontWeight='bold'
            >
              {name}
            </Text>
            <Text fontSize={1}>
              {description}
            </Text>
          </Box>
          <Box width={0.4}>
            <Flex justifyContent='flex-end'>
              {licenses.length < 2 && (
                <Box my={1}>
                  <BlueOak p={1} borderRadius={2} rating={licenses[0].color}>
                    <Text.span color='white' fontWeight='bold'>
                      {licenses[0].license ? licenses[0].license : 'Unknown'}
                    </Text.span>
                  </BlueOak>
                </Box>
              )}
              {licenses.length > 1 &&
                licenses.map((l, i) => {
                  return (
                    <Box my={1}>
                      <BlueOak key={i} p={1} borderRadius={2} rating={l.color}>
                        <Text.span color='white' fontWeight='bold'>
                          {l.license ? l.license : 'Unknown'}
                        </Text.span>
                      </BlueOak>
                    </Box>
                  )
                })}
            </Flex>
            <ReactTooltip className='tooltip' effect='solid' />
          </Box>
        </Flex>
        <Box mt={1}>
          <Flex flexWrap='wrap'>
            <Box pt={1} mr={2}>
              <Text color='dark-gray' fontSize={1}>
                <FaUserAlt />
              </Text>
            </Box>
            <Text>{author ? author.name : 'Unknown'}</Text>
          </Flex>
        </Box>

        <Box mt={1}>
          <Flex flexWrap='wrap'>
            <Box pt={1} mr={1}>
              <Text fontSize={2} color='dark-gray'>
                <FaCodeBranch />
              </Text>
            </Box>

            <Text mr={2}>{version}</Text>
            <Latest latest={latest} />
          </Flex>
        </Box>
        <Scoped scoped={scoped} />
        {children && (
          <Box>
            {children && children.length > 0 && (
              <Box
                onClick={() => {
                  setHidden(!hidden)
                }}
              >
                {hidden ? (
                  <Box>
                    <Text fontSize={2}>
                      <FiChevronDown style={{ cursor: 'pointer' }} />
                      {children.length}
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    <Text fontSize={2}>
                      <FiChevronUp style={{ cursor: 'pointer' }} />
                    </Text>
                  </Box>
                )}
              </Box>
            )}
            {children.map((d, i) => (
              <HideStyled key={i} hidden={hidden}>
                <Dependency hidden={hidden} {...d} />
              </HideStyled>
            ))}
          </Box>
        )}
      </Box>
    </Fragment>
  )
}

const HideStyled = styled.div`
  opacity: ${props => (props.hide ? 0 : 1)};
  height: ${props => (props.hide ? 0 : '100%')};
`

export default Dependency
