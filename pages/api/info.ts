// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as db from '../../db/db'
import Logs from '../../db/models/logSchema'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ count: number; pages: number } | unknown>
) {
  try {
    await db.connect()

    const { limit = 10000 } = req.body

    const count = await Logs.countDocuments()
    const pages = Math.ceil(count / limit)

    res.status(200).json({ count, pages })
  } catch (err) {
    res.status(404).send(err)
  }
}
