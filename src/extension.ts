import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "vscode-quick-junit" is now active!');

  const disposable = vscode.commands.registerCommand('vscode-quick-junit.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from vscode-quick-junit!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
