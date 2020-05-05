import {formatTimeForDisplay} from '../utils.ts';

describe('formatTimeForDisplay', () => {
  it("should return formatted Display as ' 01:00'", () => {
    const seconds = 60;
    const result = formatTimeForDisplay(seconds);
    const expected = '01:00';
    expect(result.formattedDisplay).toEqual(expected);
  });

  it("should return formatted Display as ' 09:00'", () => {
    const seconds = 540;
    const result = formatTimeForDisplay(seconds);
    const expected = '09:00';
    expect(result.formattedDisplay).toEqual(expected);
  });
});
