
import { NextApiRequest, NextApiResponse } from 'next'
import carsList from '../../public/api/cars.json'

const carHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const availableCarsList = carsList as Car[]
    res.status(200).json(availableCarsList)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default carHandler
