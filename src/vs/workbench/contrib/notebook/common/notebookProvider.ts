/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as glob from 'vs/base/common/glob';
import { URI } from 'vs/base/common/uri';
import { basename } from 'vs/base/common/resources';
import { INotebookKernelInfoDto } from 'vs/workbench/contrib/notebook/common/notebookCommon';

export interface NotebookSelector {
	readonly filenamePattern?: string;
	readonly excludeFileNamePattern?: string;
}

export class NotebookProviderInfo {

	readonly id: string;
	readonly displayName: string;
	readonly selector: readonly NotebookSelector[];
	readonly providerDisplayName: string;
	readonly providerExtensionLocation: URI;
	kernel?: INotebookKernelInfoDto;

	constructor(descriptor: {
		readonly id: string;
		readonly displayName: string;
		readonly selector: readonly NotebookSelector[];
		readonly providerDisplayName: string;
		readonly providerExtensionLocation: URI;
	}) {
		this.id = descriptor.id;
		this.displayName = descriptor.displayName;
		this.selector = descriptor.selector;
		this.providerDisplayName = descriptor.providerDisplayName;
		this.providerExtensionLocation = descriptor.providerExtensionLocation;
	}

	matches(resource: URI): boolean {
		return this.selector.some(selector => NotebookProviderInfo.selectorMatches(selector, resource));
	}

	static selectorMatches(selector: NotebookSelector, resource: URI): boolean {
		if (selector.filenamePattern) {
			if (glob.match(selector.filenamePattern.toLowerCase(), basename(resource).toLowerCase())) {
				if (selector.excludeFileNamePattern) {
					if (glob.match(selector.excludeFileNamePattern.toLowerCase(), basename(resource).toLowerCase())) {
						// should exclude

						return false;
					}
				}
				return true;
			}
		}
		return false;
	}
}
