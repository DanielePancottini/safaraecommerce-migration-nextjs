import type { GraphQLFetcher } from '@vercel/commerce/api'

import { API_URL, API_TOKEN } from '../../const'
import { getError } from '../../utils/handle-fetch-response'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  headers?: HeadersInit
) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': API_TOKEN!,
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const { data, errors, status } = await res.json()

    if (errors) {
      throw getError(errors, status)
    }

    return { data, res }
  } catch (err) {
    throw getError([err], 500)
  }
}
export default fetchGraphqlApi
