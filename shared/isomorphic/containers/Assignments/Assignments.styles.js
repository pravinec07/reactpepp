import styled, { createGlobalStyle } from 'styled-components';

export const AssignmentsStyles = createGlobalStyle`
.table-operations {
    margin-bottom: 16px;
  }
  
  .table-operations > button {
    margin-right: 8px;
  }`;

export const AssignmentsContainer = styled.div`
  padding: 10px;
  .table-operations {
    margin-bottom: 16px;
  }

  .table-operations > button {
    margin-right: 8px;
  }
`;

export const AssignmentDetailsWrapper = styled.div`
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
