import React from 'react'
import { Formik, Form } from 'formik'
import { string, object } from 'yup'
import { useRouter } from 'next/router'
import Box from './Box'
import Flex from './Flex'
import Input from './Input'
import Button from './Button'
import Error from './Error'

const UrlForm = () => {
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
        setErrors({
          url: false,
          serverError: false
        })
        let { url } = values
        router.push(`/?url=${url}`)
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
