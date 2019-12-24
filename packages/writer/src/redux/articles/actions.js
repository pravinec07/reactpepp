const actions = {
  GET_ARTICLE: 'GET_ARTICLE',
  GET_ARTICLE_SUCCESS: 'GET_ARTICLE_SUCCESS',
  GET_ARTICLE_ERROR: 'GET_ARTICLE_ERROR',

  getArticle: () => {
    return { type: actions.GET_ARTICLE };
  },

  getArticleSuccess: data => ({
    type: actions.GET_ARTICLE_SUCCESS,
    payload: { data },
  }),

  getArticleError: error => ({
    type: actions.GET_ARTICLE_ERROR,
    payload: { error },
  }),
};
export default actions;
