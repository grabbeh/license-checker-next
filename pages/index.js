import React, { useState, useEffect } from 'react'
import Intro from '../components/Intro'
import Box from '../components/Box'
import Text from '../components/Text'
import Layout from '../components/Layout'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import TabList from '../components/TabList'
import TabPanels from '../components/TabPanels'
import Table from '../components/Table'
import Tree from '../components/TreeStructure'
import InputSideBar from '../components/InputSideBar'
import ResultsSideBar from '../components/ResultsSideBar'
import Loading from '../components/Loading'
import AttributionList from '../components/AttributionList'
import TreeVis from '../components/TreeVis'
import Flex from '../components/Flex'
import { server } from '../config/index'
import fetch from 'isomorphic-unfetch'

const Index = props => {
  let { serverData } = props
  useEffect(() => {
    if (serverData) {
      setData(serverData)
    }
  })

  let [data, setData] = useState(null)
  let [flat, setFlat] = useState(null)
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(false)

  return (
    <Layout>
      <Box>
        <Flex flexWrap='wrap'>
          <Box p={[2, 3]} width={[1, 0.4, 1 / 4]} minHeight={[1, '100vh']}>
            <Box>Home</Box>
            <Box mb={2}>
              <Text fontSize={4} fontWeight='bold'>
                Licence checker
              </Text>
            </Box>
            <InputSideBar setLoading={setLoading} setData={setData} />
            {data && (
              <ResultsSideBar
                dependencies={data.flat}
                name={data.tree.data.name}
              />
            )}
          </Box>
          <Box
            py={[2, 3]}
            px={[2, 4]}
            width={[1, 0.6, 3 / 4]}
            minHeight='100vh'
          >
            {!loading && !data && !error && (
              <Box>
                <Intro />
              </Box>
            )}
            {loading && <Loading />}
            {error && error}
            {data && (
              <Tabs>
                <TabList>
                  <Tab>
                    <Text fontSize={2}>Tree</Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>Table</Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>Attribution</Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>Visualisation</Text>
                  </Tab>
                </TabList>
                <TabPanels>
                  <Tree tree={data.tree.children} />
                  <Table dataRows={data.flat} />
                  <AttributionList setDependencies={setFlat} deps={data.flat} />
                  <TreeVis tree={data.tree} />
                </TabPanels>
              </Tabs>
            )}
          </Box>
        </Flex>
      </Box>
    </Layout>
  )
}

export default Index

Index.getInitialProps = async props => {
  if (props.query.url) {
    let { url } = props.query
    const res = await fetch(`${server}/process-package-json`, {
      body: JSON.stringify({ url }),
      method: 'POST'
    })
    const data = await res.json()
    return { serverData: data }
  } else return {}
}
