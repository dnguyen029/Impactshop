import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    studioUrl: '/studio',
  },
})
