/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string if input is an empty string', () => {
    const input = '';
    expect(pipe.transform(input, '10')).toBe(input);
  });

  it('should return a string with a length three characters bigger than limit value', () => {
    const input = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet';
    const limit = '10';
    expect(pipe.transform(input, limit).length).toBe(+limit + 3);
  });

  it('should return a twenty three characters string if no limit is specified', () => {
    const input = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet';
    expect(pipe.transform(input).length).toBe(23);
  });

  it('shouldn\'t do anything if limit is bigger than input string', () => {
    const input = 'Test String';
    expect(pipe.transform(input, '20')).toBe(input);
  });

  it('should truncate the string to the number of characters specified', () => {
    const input = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet';
    const returnValue = pipe.transform(input, '15');
    expect(returnValue.replace('...', '').length).toBe(15);
  });

  it('should add ellipsis at the en of the string', () => {
    const input = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet';
    const returnValue = pipe.transform(input);
    const trailingChars = returnValue.slice(-3);
    expect(trailingChars).toBe('...');
  });

});
