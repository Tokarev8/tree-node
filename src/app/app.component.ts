import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TreeNodeComponent} from '../tree_node/tree-node.component';
import {MOCK_TREES} from './mock_file/mock_tree';
import {TreeService} from '../services/tree.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeNodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public treeService: TreeService) {
    this.treeService.setTrees(MOCK_TREES);
  }}

