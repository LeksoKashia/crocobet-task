import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'details-pop-up',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatIcon, MatButton],
  templateUrl: './details-pop-up.component.html',
  styleUrl: './details-pop-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
