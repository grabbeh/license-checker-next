import React, { useState } from 'react'
import Box from './Box'
import Text from './Text'
import TextArea from './TextArea'
import Flex from './Flex'
import Button from './Button'
import NewLicenseForm from './NewLicenseForm'
import PDFGenerator from './PDFGenerator'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

const AttributionList = ({ deps, setDependencies }) => {
  let [showNewForm, setNewFormDisplay] = useState(false)
  let [licenseText, setLicense] = useState(false)
  let [editableIndex, setEditableIndex] = useState()
  let [editableLicenseIndex, setLicenseIndex] = useState()

  const addLicense = (newLicense) => {
    let { name, text } = newLicense
    let revised = {
      name,
      // TODO: Set licenses from dropdown
      licenses: [{text, license: null}]
    }
    let newDeps = [...deps, revised]
    setDependencies(newDeps)
  }

  const submitLicense = () => {
    let dep = deps[editableIndex]
    let license = dep.licenses[editableLicenseIndex]
    let licenses = dep.licenses.map((l, i) => {
      if (editableLicenseIndex === i) {
        return {
          ...license,
          text: licenseText
        }
      } else return l
    })

    let revisedDeps = deps.map((d, i) => {
      if (editableIndex === i) {
        return {
          ...dep,
          licenses
        }
      } else return d
    })
    setDependencies(revisedDeps)
    setEditableIndex(null)
    setLicense(null)
  }

  const deleteLicense = (dI, lI) => {
    let dep = deps[dI]
    let licenses = dep.licenses.filter((l, i) => {
      return i !== lI
    })

    let revisedDeps = deps.map((d, i) => {
      if (dI === i) {
        return {
          ...dep,
          licenses
        }
      } else return d
    })
    setDependencies(revisedDeps)
  }

  return (
    <Box mt={2} mb={3}>
      <Flex flexWrap='wrap' justifyContent='flex-end'>
        <Box>
          <Button onClick={() => setNewFormDisplay(!showNewForm)}>
            {showNewForm ? 'Hide form' : 'Add new license'}
          </Button>
        </Box>
        <Box ml={3}>
          <PDFGenerator deps={deps} />
        </Box>
      </Flex>
      { showNewForm &&
      <Box>
        <NewLicenseForm addLicense={addLicense} />
      </Box>}
      {deps.map((d, dependencyIndex) => {
        return d.licenses.map(({ text }, licenseIndex) => {
          return (
            <Box key={licenseIndex}>
              <Box mt={3}>
                <Text fontWeight='bold' fontSize={3}>
                  {d.name}
                </Text>
              </Box>
              {!text && !editableIndex && <Box mt={2}><Text>We couldn't find any text</Text></Box>}
              {editableIndex === dependencyIndex &&
                editableLicenseIndex === licenseIndex ? (
                  <Box mt={2}>
                    <TextArea
                      handleChange={e => {
                        setLicense(e.target.value)
                      }}
                      value={licenseText}
                      height={400}
                      name='licenseText'
                      placeholder='Enter a license'
                    />
                    <Box my={2}>
                      <Flex flexWrap='wrap'>
                        <Button
                          onClick={() => {
                            submitLicense()
                          }}
                        >
                            Submit
                        </Button>
                        <Box ml={3}>
                          <Button
                            onClick={() => {
                              setEditableIndex(null)
                              setLicense(null)
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
              ) : <Box><Box mb={2} style={{overflowX: 'auto'}}><Text fontSize={[1,2]}><pre>{text}</pre></Text></Box>
                <Flex flexWrap='wrap'>
                  <Button
                    onClick={() => {
                      deleteLicense(dependencyIndex, licenseIndex)
                    }}
                  >
                    Delete
                    <FaTrashAlt style={{marginLeft: '10px'}}/>   
                  </Button>
                  <Box ml={3}>
                    <Button
                      onClick={() => {
                        setEditableIndex(dependencyIndex)
                        setLicenseIndex(licenseIndex)
                        setLicense(text)
                      }}
                    >
                      Edit
                     <FaEdit style={{marginLeft: '10px'}}/>   
                  
                    </Button>
                  </Box>
                </Flex>
              </Box>}
            </Box>
          )
        })
      })}
    </Box>
  )
}

export default AttributionList
