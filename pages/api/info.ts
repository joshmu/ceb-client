// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as db from '../../db/db'
import Logs from '../../db/models/logSchema'

export type InfoResponseType = {
  totalRecords: number
  totalPages: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InfoResponseType | unknown>
) {
  try {
    const { limit = 10000 } = req.body
    await db.connect()

    const totalRecords = await Logs.countDocuments()
    const totalPages = Math.ceil(totalRecords / limit)

    res.status(200).json({ totalRecords, totalPages })
  } catch (err) {
    res.status(404).send(err)
  }
}
