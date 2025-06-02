import {Injectable, signal, WritableSignal} from '@angular/core';
import {TreeNode} from '../app/mock_file/mock_tree';

@Injectable({ providedIn: 'root' })
export class TreeService {

  public tree1 = signal<TreeNode | null>(null);
  public tree2 = signal<TreeNode | null>(null);
  public childrenCountByNodeId: WritableSignal<Map<number, number>> = signal<Map<number, number>>(new Map());

  public setTrees(trees: TreeNode[]): void {
    this.tree1.set(trees[0] ?? null);
    this.tree2.set(trees[1] ?? null);
    this.childrenCountByNodeId.set(this.calculateCountChildren(trees[1]));
  }

  public showId(id: number): void {
    console.log(`нажали на узел ID ${id}`);
  }

  private calculateCountChildren(node: TreeNode): Map<number, number> {
    const stack: { node: TreeNode; state: 'process' | 'sum' }[] = [];
    let map = new Map<number, number>();
    stack.push({ node: node, state: 'process' });

    while (stack.length > 0) {
      let currentNode = stack.pop()!;
      if (currentNode.state === 'process') {
        if (currentNode.node.children.length === 0) {
          map.set(currentNode.node.id, 0);
          continue;
        }
        stack.push({ node: currentNode.node, state: 'sum' });
        for (let i = currentNode.node.children.length-1; i >= 0; i--) {
          stack.push({ node: currentNode.node.children[i], state: 'process' });
        }
      } else if (currentNode.state === 'sum') {
        let total: number = 0
        for (const childNodeElement of currentNode.node.children) {
          total+= (map.get(childNodeElement.id) || 0) + 1;
        }
        map.set(currentNode.node.id, total);
      }
    }

    return map;
  }
}
