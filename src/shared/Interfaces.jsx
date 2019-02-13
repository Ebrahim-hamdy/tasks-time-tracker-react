import { struct } from "superstruct";

export const validateUseFieldInbut = struct({
  name: 'string',

  form: struct.partial({
    getFormData: 'function',
    validateFields: 'function',
    addField: 'function'
  }),

  options: {
    defaultValue: 'any?',
    validations: struct.list(['function']),
    fieldsToValidateOnChange: struct.list(['string'])
  }
});

export const validateUseFormInput = struct({
  options: {
    onSubmit: 'function'
  }
});

export const validateAddFieldInput = struct({
  field: struct.partial({
    name: 'string',
    errors: struct.list(['string']),
    value: 'any?',
    validate: 'function'
  })
});

export const validateSetErrorsInput = struct({
  errors: struct.list(['string'])
});
