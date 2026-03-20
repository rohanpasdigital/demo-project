/**
 * RTK Query API configuration
 * This is the base API instance that all other APIs extend
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../config/environment';
import { tokenUtils } from '../../utils';

const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = tokenUtils.get();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Messages', 'User', 'Auth'],
  endpoints: () => ({}),
});
