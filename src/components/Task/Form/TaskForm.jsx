import React from "react";

import { useForm, useField } from "../../../shared/utilities/Form";

import "./TaskForm.scss";

const Field = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  errors,
  setErrors,
  pristine,
  validating,
  validate,
  formSubmitted,
  ...other
}) => {
  let showErrors = (!pristine || formSubmitted) && !!errors.length;
  return (
    <>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={() => !pristine && validate()}
        {...other}
        className={`task-label ${showErrors ? "error" : ""}`}
      />
      {showErrors &&
        errors.map(errorMsg => (
          <p className="error" key={errorMsg}>
            {errorMsg}
          </p>
        ))}
    </>
  );
};

const TaskForm = props => {
  const form = useForm({
    onSubmit: (formData, valid) => {
      props.isValid = valid;
      if (!valid) return;
    }
  });

  const taskNameField = useField("taskName", form, {
    defaultValue: "",
    validation: [
      formData => {
        return "Task name is required";
      }
    ],
    fieldsToValidateOnChange: []
  });

  const taskDescField = useField("taskDesc", form, {
    defaultValue: "",
    validation: [
      formData => {
        return "Task Description is required";
      }
    ],
    fieldsToValidateOnChange: []
  });

  let requiredFields = [taskNameField, taskDescField];

  return (
    <>
      <form
        className={`task-form ${props.showForm ? "task-form--show" : ""}`}
        onSubmit={form.onSubmit}
      >
        <Field
          {...taskNameField}
          formSubmitted={form.submitted}
          placeholder="Task name"
        />

        <Field
          {...taskDescField}
          formSubmitted={form.submitted}
          placeholder="Task Description"
        />
      </form>
    </>
  );
};

export default TaskForm;
