import * as vscode from 'vscode';
import { toggleTestFile } from './toggleTestFile';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('vscode-quick-junit.toggleTestFile', toggleTestFile);
  context.subscriptions.push(disposable);
}

export function deactivate() {}
