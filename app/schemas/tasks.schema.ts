import Joi from "joi";

import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export const taskBodySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
});

export const paramTaskSchema = Joi.object({
    id: Joi.string().required(),
  });

export interface ITaskColletion {
  title: string;
  description: string;
  status: string;
}

export interface ITaskBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: ITaskColletion;
}

export interface ITaskParamSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
      id: string;
    };
  }