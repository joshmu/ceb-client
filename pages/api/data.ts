// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as db from '../../db/db'

import { LogType } from '../../src/types/d'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogType[]>
) {
  db.connect()
    .then(() => {
      db.getTrimmedLogs().then(data => {
        res.status(200).json(data as LogType[])
      })
    })
    .catch(e => {
      res.status(404).send(e)
    })
}
