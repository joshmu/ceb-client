// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as db from '../../db/db'

import Logs from '../../db/models/logSchema'
import { LogType } from '../../src/types/d'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogType[] | unknown>
) {
  try {
    await db.connect()

    // get payload from request
    const { limit = 10000, page = 1 } = req.body

    let logs = await Logs.find(
      { balances: { $exists: true } },
      {
        'btcusd.signals.daily': 1,
        'ethbtc.signals.daily': 1,
        'ethusd.signals.daily': 1,
        'btcusd.ticker.mid': 1,
        'ethbtc.ticker.mid': 1,
        'ethusd.ticker.mid': 1,
        appTimestamp: 1,
        balances: 1,
        order: 1,
      }
    )
      .sort({ appTimestamp: 'asc' })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()

    res.status(200).json(logs)
  } catch (err) {
    res.status(404).send(err)
  }
}
