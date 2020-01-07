import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import TabList from './TabList'
import TabPanels from './TabPanels'
import UrlForm from './UrlForm'
import JSONForm from './JSONForm'
import Text from '../components/Text'

const InputSideBar = props => {
  let { setLoading, setResponse } = props
  return (
    <Tabs>
      <TabList>
        <Tab>
          <Text fontSize={2}>URL</Text>
        </Tab>
        <Tab>
          <Text fontSize={2}>Paste</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <UrlForm setLoading={setLoading} setResponse={setResponse} />
        <JSONForm setLoading={setLoading} setResponse={setResponse} />
      </TabPanels>
    </Tabs>
  )
}

export default InputSideBar
