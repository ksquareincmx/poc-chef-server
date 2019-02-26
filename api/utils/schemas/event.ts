import * as Joi from "joi";

const eventIdSchema = Joi.string().max(36);

// TODO validate:
/*
  expiration_date > start_hour, both in future date,
  start_hour < end_hourt, both are valid
*/
// Note: this validations delete validations in Controllers

const createEventSchema = {
  event_name: Joi.string()
    .max(250)
    .required(),
  start_date: Joi.number().required(),
  expiration_date: Joi.number().required(),
  start_hour: Joi.number()
    .positive()
    .min(0)
    .max(1440)
    .required(),
  end_hour: Joi.number()
    .positive()
    .min(0)
    .max(1440)
    .required(),
  poc_chuc_torta_unitary_price: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  poc_chuc_torta_amount: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  shrimp_torta_unitary_price: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  shrimp_torta_amount: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  total: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  finished: Joi.boolean().required()
};

export { eventIdSchema, createEventSchema };
