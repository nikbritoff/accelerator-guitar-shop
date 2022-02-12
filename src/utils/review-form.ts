import { formFields } from '../components/review-form/review-form';

export const getFieldValidity = (name: string, value: string) => {
  switch(name) {
    case formFields.userName:
    case formFields.comment:
      return value.trim() !== '';
    default:
      return true;
  }
};
