import { IncomingMessage } from 'http'

export const getOriginServer = (req: IncomingMessage): string => {
  const dev = process.env.NODE_ENV !== 'production'
  let server = dev ? 'http://localhost:3000' : 'https://ceb-client.vercel.app'

  // * using 'x-forwarded-host' since lambda can run on a different port
  if (req && !dev) server = `https://${req.headers['x-forwarded-host']}`

  return server
}
