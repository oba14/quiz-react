import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getQuestions } from "../../../actions/questions";

const QuizForm = props => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
    category: '9',
    difficulty: "easy",
    noofquestions: 2
  }
});

  console.log("THIS IS QUIZ FORMMMMMMMMMMMM");
  console.log("THIS IS QUIZ FORM STATEEEEEEE ", questions);

  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" }
  ];

  const addOptions = () => {
    const categoryDom = document.getElementById("categories");
    // console.log('CATEGORY DOM', categoryDom);
    // console.log('CATEGORIESSSSSSS', categories);

    if (categories) {
      categories.map(category => {
        categoryDom.innerHTML += `<option value=${category.id}>${category.name}</option>`;
      });
    }
  };

  const onSubmit = data => {
    const myForm = document.getElementById("myForm");
    console.log('MY FORMMMM',data);
    //console.log("Created FormData, " + [...myForm.keys()].length + " keys in data");
    // const formData = new FormData(myForm);
    // const selectedCategory = formData.get("category");
    // const selectedDifficulty = formData.get("difficulty");
    // const noOfQuestions = formData.get("noofquestions");
    const selectedCategory = data.category;
    const selectedDifficulty = data.difficulty;
    const noOfQuestions = data.noofquestions;

    dispatch(
      getQuestions({
        selectedCategory,
        selectedDifficulty,
        noOfQuestions
      })
    );
  };

  useEffect(() => {
    addOptions();
  });

  useEffect(() => {
    if (questions.length > 0) {
      props.history.push("/quiz");
    }
  });

  return (
    <div className="container">
      <h3 data-testid="quiz-form-heading">
        Select quiz category and difficult level
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="myForm"
        name="myForm"
        encType="multipart/form-data"
      >
        <label htmlFor="categories">1- Select a category</label> <br></br>
        <select
          data-testid = "category-test-quiz-form"
          style={{ width: "47%" }}
          id="categories"
          name="category"
          ref={register({ required: true })}
        ></select>{" "}
        <br></br>
        <label>2- Select a difficulty level</label> <br></br>
        <select
          style={{ width: "47%" }}
          name="difficulty"
          ref={register({ required: true })}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br></br>
        <label>3- Select number of questions.</label> <br></br>
        <input
          style={{ width: "47%", margin: "0 auto" }}
          className="form-control"
          data-testid = "no-of-questions"
          type="number"
          placeholder="Number of questions"
          name="noofquestions"
          ref={register({ required: true })}
          required
        />
        <br />
        <button
          data-testid="form-submit-btn"
          className="btn btn-primary"
          type="submit"
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
};
export default QuizForm;
