import React from 'react';
import renderer from 'react-test-renderer';

import DataVisual from '../DataVisual';

// Sets boundary using jest.mock to render 'down' the elements in the DOM

jest.mock('react-chartjs-2', () => ({
  Pie: 'Pie',
}));

test('DataVisual snapshot testing', () => {
  const pieChart = {
    labels: [
      'Restaurant 1',
      'Restaurant 2',
      'Restaurant 3',
      'Restaurant 4',
      'Restaurant 5',
    ],
    dataset: [
      {
        label: '# of Votes',
        data: [10, 5, 6, 8, 15],
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const tree = renderer.create(<DataVisual data={pieChart} />).toJSON();
  expect(tree).toMatchSnapshot();
});
