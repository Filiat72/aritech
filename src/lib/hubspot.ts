import { Client } from '@hubspot/api-client'

export const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN!,
})