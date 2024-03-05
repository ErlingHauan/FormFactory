export const form = {
  id: 1994,
  title: "Pet survey",
  published: "2018-01-10",
  components: [
    {
      id: 1,
      question: "How many animals do you have?",
      type: "textfield",
      minLength: 1,
      maxLength: 3,
    },
    {
      id: 2,
      question: "Do you prefer dogs or cats?",
      type: "radio",
      choices: ["Dogs", "Cats"],
    },
    {
      id: 3,
      question: "Would you consider being an animal owner?",
      type: "textfield",
      minLength: 2,
      maxLength: 300,
    },
    {
      id: 4,
      question: "How often do you take your pets for a walk?",
      type: "radio",
      choices: ["Daily", "2-3 times a week", "Weekly", "Rarely", "Never"],
    },
    {
      id: 5,
      question: "What is the main factor in choosing a pet?",
      type: "textfield",
      minLength: 0,
      maxLength: 200,
    },
    {
      id: 6,
      question: "Have you ever adopted a pet from a shelter?",
      type: "radio",
      choices: ["Yes", "No"],
    },
  ],
};
