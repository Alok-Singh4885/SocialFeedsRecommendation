/**
 * Created By Alok Pratap Singh 23-04-2024
 */

const joi = require("joi");
import { Request, Response, NextFunction } from 'express';

export function validateFields(req: any, res: any, schema: any) {
    const validation = schema.validate(req);
    if (validation.error) {
      const errorReason =
        validation.error.details !== undefined
          ? validation.error.details[0].message
          : "Parameter missing or parameter type is wrong";
      sendParameterMissingResponse(res, errorReason);
      return false;
    }
    return true;
  }
  
  export function sendParameterMissingResponse(res: any, errorReason: any) {
    errorReason = errorReason || "Required Parameters are missing";
    return res.status(400).json({
      success: false,
      message: errorReason,
    });
  }
  
  export const joiHandler = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const data = {
        ...(req?.body && Object.keys(req?.body).length > 0 ? req.body : {}),
        ...(req?.query && Object.keys(req?.query).length > 0 ? req.query : {}),
        ...(req?.params && Object.keys(req?.params).length > 0 ? req.params : {})
    }
  
    const validFields = validateFields(data, res, schema)
    if (validFields) {
        next()
    }
  }
  