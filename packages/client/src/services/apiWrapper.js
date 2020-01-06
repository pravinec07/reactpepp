import api from './api';
import apiRoutes from './apiRoutes';

export const projectSave = (data, username) =>
  api.post(`${apiRoutes.PROJECT_SAVE}?userId=${username}`, data);
//export const projectSave = (data, username) => api.post(`${apiRoutes.PROJECT_SAVE}?userId=1`, data);
export const articleSave = (data, projectId) =>
  api.post(`${apiRoutes.ARTICLE_SAVE}?projectId=${projectId}`, data);
