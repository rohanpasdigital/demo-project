/**
 * Chat/Messages API slice using RTK Query
 * Handles all message-related API calls
 */

import { baseApi } from './baseApi';
import type { Message } from '../../types';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessagesByRoom: builder.query<Message[], string>({
      query: (room) => `/messages/${room}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Messages' as const, id: _id })),
              { type: 'Messages', id: 'LIST' },
            ]
          : [{ type: 'Messages', id: 'LIST' }],
    }),

    deleteMessage: builder.mutation<void, string>({
      query: (messageId) => ({
        url: `/messages/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const { useGetMessagesByRoomQuery, useDeleteMessageMutation } = chatApi;
