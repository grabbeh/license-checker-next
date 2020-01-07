import React from 'react'
import { Formik, Form } from 'formik'
import Box from './Box'
import Flex from './Flex'
import Button from './Button'
import Input from './Input'
import Error from './Error'
import TextArea from './TextArea'

const NewLicenseForm = props => {
  let { addLicense } = props
  return (
    <Formik
      initialValues={{
        name: '',
        text: ''
      }}
      validateOnChange={false}
      validate={values => {
        let errors = {}
        if (!values.name) errors.name = 'Please give a name'
        if (!values.text) errors.text = 'We need a license'
        return errors
      }}
      onSubmit={(values, { setSubmitting, setErrors, setValues }) => {
        setErrors({
          name: false,
          text: false
        })
        let { name, text } = values
        addLicense({ name, text })
        setValues({ name: '', text: '' })
        setSubmitting(false)
      }}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange } = props
        return (
          <Box maxWidth={800} mt={2}>
            <Form>
              <Input
                onChange={handleChange}
                name='name'
                value={values.name}
                label='Package name'
              />
              <Box>{touched.name && <Error>{errors.name}</Error>}</Box>
              <Box mt={4}>
                <TextArea
                  label='Add some license text'
                  handleChange={handleChange}
                  value={values.text}
                  height={400}
                  name='text'
                />
              </Box>
              <Box>{touched.text && <Error>{errors.text}</Error>}</Box>
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

export default NewLicenseForm
