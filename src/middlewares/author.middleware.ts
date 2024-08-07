import { body } from 'express-validator';
import { t } from 'i18next';
import { MIN_LENGTH } from '../constant';

export const checkValidDateOfBirth = body('dateOfBirth').custom((value, { req }) => {
  if (!value || !req.body.dateOfDeath) return true;

  const dateOfBirth = new Date(value);
  const dateOfDeath = new Date(req.body.dateOfDeath);
  const currentDate = new Date();

  if(dateOfBirth > currentDate) {
    throw new Error(t('error.dateOfBirthMustBeBeforeCurrentDate'));
  }

  if (dateOfBirth > dateOfDeath) {
    throw new Error(t('error.dateOfBirthMustBeBeforeDateOfDeath'));
  }

  return true;
});

export const checkValidDateOfDeath = body('dateOfDeath').custom((value, { req }) => {
  if (!value || !req.body.dateOfBirth) return true;

  const dateOfDeath = new Date(value);
  const dateOfBirth = new Date(req.body.dateOfBirth);

  const currentDate = new Date();

  if(dateOfDeath > currentDate) {
    throw new Error(t('error.dateOfDeathMustBeBeforeCurrentDate'));
  }

  if (dateOfBirth > dateOfDeath) {
    throw new Error(t('error.dateOfDeathMustBeAfterDateOfBirth'));
  }

  return true;
});

export const commonAuthorValidation = [
  body('firstName', t('error.firstNameMustNotBeEmpty')).trim().isLength({ min: MIN_LENGTH }).escape(),
  body('familyName', t('error.familyNameMustNotBeEmpty')).trim().isLength({ min: MIN_LENGTH }).escape(),
  checkValidDateOfBirth,
  checkValidDateOfDeath,
];
