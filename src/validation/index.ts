import joi from 'joi';

export const uuidValidation = joi.string().guid({
  version: ['uuidv4'],
});

export const idValidator = joi.object({
  id: uuidValidation.required(),
});

export const requiredStringValidation = joi.string().required();
export const stringValidation = joi.string();
export const requiredNumberValidation = joi.number().required();
export const requiredStringBooleanValidation = requiredStringValidation
  .valid('1')
  .valid('0');
export const requiredArrayValidation = joi.array().required();
export const arrayValidation = joi.array();
export const booleanValidation = joi.boolean();
export const requiredBooleanValidation = joi.boolean().required();
export const requiredStringWithAllowNullValidation = joi
  .string()
  .required()
  .allow('');
export const enumRequiredValidation = (enumValidation: any) =>
  joi
    .string()
    .required()
    .valid(...enumValidation);
export const objectIdValidation = joi.string().hex().length(24);
export const emailValidation = joi.string().email();
