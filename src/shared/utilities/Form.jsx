import  { useState, useEffect, useRef } from "react";

import {
  validateUseFieldInput,
  validateUseFormInput,
  validateAddFieldInput,
  validateSetErrorsInput
} from '../interfaces';

export const useField = (
  name,
  form,
  { defaultValue, validations = [], fieldsToValidateOnChange = [name] }
) => {
  validateAddFieldInput({
    name,
    form,
    options: {
      defaultValue,
      validations,
      fieldsToValidateOnChange
    }
  });

  let [value, setValue] = useState(defaultValue);
  let [errors, setErrors] = useState([]);
  let [pristine, setPristine] = useState(true);
  let [validating, setValidating] = useState(false);
  let validateCounter = useRef(0);

  const validate = async () => {
    let validateIteration = ++validateCounter.current;
    setValidating(true);

    let formData = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map(validation => validation(formData, name))
    ).catch(e => [e.message]);

    errorMessages = errorMessages.filter(errMsg => !!errMsg);

    if(validateIteration === validateCounter.current) {
      setErrors(errorMessages);
      setValidating(false);
    }

    return errorMessages.length === 0;
  };

  useEffect(
    () => {
      if(pristine) return;
      form.validateFields(fieldsToValidateOnChange);
    },
    [value]
  );

  let field = {
    name,
    value,
    errors,
    pristine,
    vaidate,
    validating,
    setErrors: errs => {
      validateSetErrorsInput({ errs });
      setErrors(errs);
    },
    onChange: e => {
      if(pristine) {
        setPristine(false);
      }
      setValue(e.target.value);
    }
  };

  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  validateUseFormInput({ options: { onSubmit } });

  let [submitted, setSubmitted] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let fields = [];

  const validateFields = async fieldNames => {
    let fieldsToValidate;

    if(fieldNames instanceof Array) {
      fieldsToValidate = fields.filter(field => {
        fieldNames.includes(field.name);
      });

    } else {
      // validate all fields if fieldNames not provided
      fieldsToValidate = fields;
    }

    let fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate())
    ).catch(err => false);

    let formValid = fieldsValid.every(isValid => isValid === true);

    return formValid;
  };

  const getFormData = () => {
    return fields.reduce((formData, f) => {
      formData[f.name] = f.value;
      return formData;
    }, {});
  };

  return {
    onSubmit: async e => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitted(true);// User has attempted to submit form at least once

      let formValid = await validateFields();
      let returnVal = await onSubmit(getFormData(), formValid);

      setSubmitting(false);
      return returnVal;
    },
    isValid: () => fields.every(f => f.errors.length === 0),
    addField: field => {
      validateAddFieldInput({ field });
      fields.push(field);
    },
    getFormData,
    validateFields,
    submitted,
    submitting
  }
}
