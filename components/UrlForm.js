import React from 'react'
import { Formik, Form } from 'formik'
import { string, object } from 'yup'
import { useRouter } from 'next/router'
import Box from './Box'
import Flex from './Flex'
import Input from './Input'
import Button from './Button'
import Error from './Error'
import { server } from '../config/index'
import fetch from 'isomorphic-unfetch'

const UrlForm = props => {
  const { setLoading, setData, setFlat } = props
  const router = useRouter()
  return (
    <Formik
      initialValues={{
        url: ''
      }}
      validateOnChange={false}
      validationSchema={object().shape({
        url: string()
          .url()
          .required('Please provide a valid url')
      })}
      onSubmit={(values, { setErrors }) => {
        setLoading(true)
        setErrors({
          url: false,
          serverError: false
        })
        let { url } = values
        fetch(`${server}/process-package-json`, {
          method: 'POST',
          body: JSON.stringify({ url })
        })
          .then(r => r.json())
          .then(json => {
            setData(json)
            setFlat(json.flat)
            setLoading(false)
          })
          .catch(err => {
            let error = 'Server error'
            if (!err.response) error = 'Server timeout'
            if (err.response && typeof err.response.data === 'string') {
              error = err.response.data
            }
            setErrors({
              // serverError: 'Server error'
              serverError: error
            })
            setLoading(false)
          })
        const href = `/?url=${url}`
        const as = href
        router.push(href, as, { shallow: true })
      }}
    >
      {props => {
        const { values, errors, touched, isSubmitting, handleChange } = props
        return (
          <Box mt={2}>
            <Form>
              <Input
                style={{ boxSizing: 'border-box' }}
                onChange={handleChange}
                name='url'
                value={values.url}
                label='Please input a package.json URL'
                error={errors.url}
              />
              <Box mt={1}>
                {touched.url && (
                  <Error>{errors.url || errors.serverError}</Error>
                )}
              </Box>
              <Box mt={2}>
                <Flex justifyContent='flex-end'>
                  <Button disabled={isSubmitting} type='submit'>
                    Submit
                  </Button>
                </Flex>
              </Box>
            </Form>
          </Box>
        )
      }}
    </Formik>
  )
}

export default UrlForm
