/**
 * User API slice using RTK Query
 * Handles all user-related API calls
 */

import { baseApi } from './baseApi';

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  email: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (userData) => ({
        url: '/users/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
