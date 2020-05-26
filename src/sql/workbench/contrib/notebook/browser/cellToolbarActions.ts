/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { INotebookService } from 'sql/workbench/services/notebook/browser/notebookService';
import { ICellModel } from 'sql/workbench/services/notebook/browser/models/modelInterfaces';
import { Action } from 'vs/base/common/actions';

export const HIDDEN_CLASS = 'actionhidden';

export class CellToolbarAction extends Action {

	constructor(
		id: string,
		label: string,
		cssClass: string,
		tooltip: string,
		private _cellModel: ICellModel,
		@INotebookService private _notebookService: INotebookService
	) {
		super(id, label, cssClass);
		this._tooltip = tooltip;
	}
	// Todo: Add actions references here?
}
