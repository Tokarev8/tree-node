import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';

import {TreeService} from '../services/tree.service';
import {TreeNode} from '../app/mock_file/mock_tree';
import {TreeNodeCardComponent} from './tree_node_card/tree-node-card.component';

@Component({
  selector: 'tree-node',
  standalone: true,
  imports: [
    TreeNodeCardComponent,
  ],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNodeComponent {

  public treeNode = input.required<TreeNode>();
  public isInitiallyExpanded  = input<boolean>(false);
  public isInitiallyExpandedAll  = input<boolean>(false);

  public readonly childrenCount = computed(() =>
    this.treeService.childrenCountByNodeId().get(this.treeNode().id) ?? 0
  );

  public _isExpandedAll = signal(this.isInitiallyExpandedAll());
  public _isExpanded = signal(this.isInitiallyExpanded());

  constructor(private treeService: TreeService) {
    effect(() => {
      this._isExpandedAll.set(this.isInitiallyExpandedAll());
    });
  }

  public toggleAllNodes() {
    this._isExpanded.set(false);
    this._isExpandedAll.update(isExpanded => !isExpanded);
  }

  public toggleCurrentNode(): void {
    if (this._isExpandedAll()) {
      this._isExpandedAll.set(false);
      this._isExpanded.set(false);
    } else {
      this._isExpanded.update(isExpanded => !isExpanded);
    }
  }

  public buttonAction(): void {
    if (this.isInitiallyExpanded()){
      this.toggleAllNodes()
    } else {
      this.treeService.showId(this.treeNode().id)
    }
  }
}
