import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(
  startKey: string,
  endKey: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = control.get(startKey)?.value as string | null;
    const end = control.get(endKey)?.value as string | null;

    if (!start || !end) {
      return null;
    }

    return new Date(start) <= new Date(end)
      ? null
      : { invalidDateRange: true };
  };
}

export function matchingFieldsValidator(
  firstKey: string,
  secondKey: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const first = control.get(firstKey)?.value;
    const second = control.get(secondKey)?.value;

    return first === second
      ? null
      : { fieldsDoNotMatch: true };
  };
}
