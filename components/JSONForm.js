import React from 'react'
import { Formik, Form } from 'formik'
import isJSON from 'validator/lib/isJSON'
import Box from './Box'
import Flex from './Flex'
import Button from './Button'
import Error from './Error'
import TextArea from './TextArea'
import { server } from '../config/index'
import fetch from 'isomorphic-unfetch'

const JSONForm = props => {
  const { setLoading, setData, setFlat } = props
  return (
    <Formik
      initialValues={{
        json: ''
      }}
      validateOnChange={false}
      validate={values => {
        let errors = {}
        if (!values.json) {
          errors.json = 'Please provide some JSON'
        } else if (!isJSON(values.json)) {
          errors.json = 'Invalid JSON'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        setLoading(true)
        setData(null)
        setErrors({
          json: false,
          serverError: false
        })
        let { json } = values

        fetch(`${server}/process-package-json`, {
          method: 'POST',
          body: JSON.stringify({ json })
        })
          .then(r => r.json())
          .then(json => {
            setSubmitting(false)
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
              serverError: error
            })
            setSubmitting(false)
            setLoading(false)
          })
      }}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange } = props
        return (
          <Box mt={2}>
            <Form>
              <TextArea
                label='Paste in a package.json file'
                handleChange={handleChange}
                value={values.json}
                height={400}
                name='json'
                error={errors.json}
              />
              <Box mt={1}>{touched.json && <Error>{errors.json}</Error>}</Box>
              <Box mt={1}>
                <Error>{errors.serverError}</Error>
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

export default JSONForm
