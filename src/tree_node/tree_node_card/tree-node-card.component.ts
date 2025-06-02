import {
  ChangeDetectionStrategy,
  Component, computed,
  input,
  output,
} from '@angular/core';
import {TreeNode} from '../../app/mock_file/mock_tree';


@Component({
  selector: 'tree-node-card',
  standalone: true,
  imports: [],
  templateUrl: './tree-node-card.component.html',
  styleUrl: './tree-node-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNodeCardComponent {

  public treeNode = input.required<TreeNode>();
  public childrenCount = input<number>(0);
  public isExpanded = input.required<boolean>();

  public isDeleted = computed(() => !!this.treeNode()?.is_deleted);

  public buttonAction = output<void>();
}
