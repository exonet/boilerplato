export const defaultIssues = [
  'time spent pr',
  'create sprint preview',
  'release the beast',
  'prepare next sprint',
  'sprint bugs',
];

export const omitDefaultIssues = issue => defaultIssues.indexOf(issue.title.toLowerCase()) === -1;

export const grabDefaultIssues = issue => defaultIssues.indexOf(issue.title.toLowerCase()) !== -1;
