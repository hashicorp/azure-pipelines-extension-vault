import tasks = require('azure-pipelines-task-lib/task');
import tools = require('azure-pipelines-tool-lib/tool');
import { ToolRunner } from 'azure-pipelines-task-lib/toolrunner';
import path = require('path');
import * as installer from './VaultInstaller';

async function configurevault() {
    let inputVersion = tasks.getInput("vaultVersion", true);
    let vaultPath = await installer.downloadVault(inputVersion);
    let envPath = process.env['PATH'];

    // Prepend the tools path. Instructs the agent to prepend for future tasks
    if (envPath && !envPath.startsWith(path.dirname(vaultPath))) {
        tools.prependPath(path.dirname(vaultPath));
    }
}

async function verifyVault() {
    console.log(tasks.loc("VerifyVaultInstallation"));
    let vaultPath = tasks.which("vault", true);
    let vaultTool : ToolRunner = tasks.tool(vaultPath);
    vaultTool.arg("version");
    return vaultTool.exec();
}

async function run() {
    tasks.setResourcePath(path.join(__dirname, '..', 'task.json'));

    try {
        await configurevault();
        await verifyVault();
        tasks.setResult(tasks.TaskResult.Succeeded, "");
    } catch (error) {
        tasks.setResult(tasks.TaskResult.Failed, error);
    }
}

run();