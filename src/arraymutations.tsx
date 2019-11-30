import expect from 'expect';
import deepFreeze from 'deep-freeze';

type List = number[];

const addCounter = (list: List) => {
  return [...list, 0];
};

const removeCounter = (list: List, index: number) => {
  return list.filter((_item, itemIndex) => itemIndex !== index);
};

const incrementCounter = (list: List, index: number) => {
  return list.map((item, listIndex) => {
    return listIndex === index ? item + 1 : item;
  });
};

const testAddCounter = () => {
  const listBefore: List = [];
  const listAfter: List = [0];

  deepFreeze(listBefore);

  expect(addCounter(listBefore)).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 1, 2];
  const listAfter = [0, 2, 2];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All test have passed');
