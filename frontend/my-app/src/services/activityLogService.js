import { apiClient } from '../utils/apiClient';

export const activityLogService = {
  getActivityLogs: () => apiClient.get('/activity-logs/'),
  createActivityLog: (activityLogData) => apiClient.post('/activity-logs/', activityLogData),
  updateActivityLog: (activityLogId, activityLogData) => apiClient.put(`/activity-logs/${activityLogId}/`, activityLogData),
  deleteActivityLog: (activityLogId) => apiClient.delete(`/activity-logs/${activityLogId}/`),
};
