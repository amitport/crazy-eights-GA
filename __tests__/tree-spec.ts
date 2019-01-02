import {chooseRandomSubtree, crossover, removeParent, Tree} from '../src/tree';
import {randomTree} from "../src/ast-tree";
import {genSamples} from "../src/genetic";

test('tree', () => {
  const tree = new Tree('A', [new Tree('B'), new Tree('C', [new Tree('D'),])]);
  const stat = {A: 0, B: 0, C: 0, D: 0};
  let i = 0;
  while (i++ < 300000) {
    stat[chooseRandomSubtree(tree).content as 'A' | 'B' | 'C' | 'D']++;
  }
  console.log(stat);
});


test('switch sub trees', () => {
  const tree1 = new Tree('A', [
    new Tree('B'),
    new Tree('C', [
      new Tree('D'),
    ])
  ]);

  const tree2 = new Tree('1', [
    new Tree('2', [
      new Tree('3'), new Tree('4')
    ]),
    new Tree('5')
  ]);
  const [c1, c2] = crossover(tree1, tree2);

  console.log(JSON.stringify(removeParent(c1), null, 2))
  console.log(JSON.stringify(removeParent(c2), null, 2))
});

test('random tree', () => {
  const t1 = randomTree();
  const t2 = randomTree();

  console.log(`\
  1) ${t1.toString()},
  2) ${t2.toString()}
  <<<<<<<
  `);
  const [c1, c2] = crossover(t1, t2);

  console.log(`after crossover parents should be unchanged:
  1) ${t1.toString()},
  2) ${t2.toString()}
  crossover children:
  1*) ${c1.toString()},
  2*) ${c2.toString()}
  `);
});

test('samples', () => {
  console.log('' + Array.from(genSamples(100)));
});
