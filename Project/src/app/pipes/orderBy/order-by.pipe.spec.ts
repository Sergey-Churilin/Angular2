import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();
  const date1 = new Date(2018, 11, 11);
  const date2 = new Date(2018, 5, 11);
  const date3 = new Date(2018, 7, 11);

  it('shoud order by date', () => {
    const defaultArr = [{creationDate: date1}, {creationDate: date2}, {creationDate: date3}];
    pipe.transform(defaultArr);
    expect(defaultArr[0].creationDate).toEqual(date2);
    expect(defaultArr[1].creationDate).toEqual(date3);
    expect(defaultArr[2].creationDate).toEqual(date1);
  });
});
