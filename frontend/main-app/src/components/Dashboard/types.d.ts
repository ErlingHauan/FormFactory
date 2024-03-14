interface Response {
  order: number,
  label: string,
  response: string
}

interface Submission {
  id: string,
  formId: string,
  submitted: string,
  responses: Response[]
}