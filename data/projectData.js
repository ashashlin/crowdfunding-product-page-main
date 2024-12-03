import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const currentDate = dayjs();
const dueDate = dayjs('2025-01-30');
const remainingDays = dueDate.diff(currentDate, 'day');

export const projectData = {
  backedAmt: 89914,
  backers: 5007,
  remainingDays: remainingDays
};
