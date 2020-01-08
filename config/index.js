const dev = process.env.NODE_ENV !== 'production'

export const server = dev
  ? 'http://localhost:4000/api'
  : 'license-checker.mbg.codes/api'
