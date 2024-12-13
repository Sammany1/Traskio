import { apiClient } from '../utils/apiClient';

export const commentService = {
  getComments: () => apiClient.get('/comments/'),
  createComment: (commentData) => apiClient.post('/comments/', commentData),
  updateComment: (commentId, commentData) => apiClient.put(`/comments/${commentId}/`, commentData),
  deleteComment: (commentId) => apiClient.delete(`/comments/${commentId}/`),
};
