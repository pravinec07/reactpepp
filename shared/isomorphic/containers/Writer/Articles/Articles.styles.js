import styled, { createGlobalStyle } from 'styled-components';

export const ArticlesStyles = createGlobalStyle`
.table-operations {
    margin-bottom: 16px;
  }
  
  .table-operations > button {
    margin-right: 8px;
  }`;

export const ArticlesContainer = styled.div`
  padding: 10px;
  .table-operations {
    margin-bottom: 16px;
  }

  .table-operations > button {
    margin-right: 8px;
  }
`;

export const ArticleDetailsWrapper = styled.div`
  padding: 10px;
  .article-details-heading {
    padding: 0;
    label {
      color: #3e75f2;
    }
    .time {
      color: red;
    }
  }
`;
