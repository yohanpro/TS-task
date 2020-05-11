import React from 'react';
import { NextPage } from 'next';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../lib/apollo';

const tasksQuery = gql`
  query Tasks($status: TaskStatus) {
    tasks(status: $status) {
      id
      title
      status
    }
  }
`;

interface TasksQuery {
  tasks: {
    id: number;
    title: string;
    status: string;
  }[];
}

interface TasksQueryVariables {
  status: string;
}

interface InitialProps {}

interface Props extends InitialProps {}

const IndexPage: NextPage<Props, InitialProps> = (props) => {
  const { loading, error, data } = useQuery<TasksQuery, TasksQueryVariables>(
    tasksQuery,
    {
      variables: { status: 'active' },
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>An error occurred.</p>;
  }
  const tasks = data?.tasks;

  return tasks && tasks.length ? (
    <ul>
      {tasks.map((task) => {
        return <li key={task.id}>{task.title}</li>;
      })}
    </ul>
  ) : (
    <p>There are no tasks here.</p>
  );
};

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
