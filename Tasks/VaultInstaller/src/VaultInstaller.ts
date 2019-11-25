import tasks = require('azure-pipelines-task-lib/task');
import tools = require('azure-pipelines-tool-lib/tool');
import path = require('path');
import os = require('os');
import fs = require('fs');

const uuidV4 = require('uuid/v4');
const vaultToolName = "vault";
const isWindows = os.type().match(/^Win/);

export async function downloadVault(inputVersion: string): Promise<string> {
    let version = tools.cleanVersion(inputVersion);
    if (!version) {
        throw new Error(tasks.loc("InputVersionNotValidSemanticVersion", inputVersion));
    }

    let cachedToolPath = tools.findLocalTool(vaultToolName, version);
    if (!cachedToolPath) {
        let vaultDownloadUrl = getvaultDownloadUrl(version);
        let fileName = `${vaultToolName}-${version}-${uuidV4()}.zip`;
        let vaultDownloadPath;

        try {
            vaultDownloadPath = await tools.downloadTool(vaultDownloadUrl, fileName);
        } catch (exception) {
            throw new Error(tasks.loc("vaultDownloadFailed", vaultDownloadUrl, exception));
        }

        let vaultUnzippedPath = await tools.extractZip(vaultDownloadPath);
        cachedToolPath = await tools.cacheDir(vaultUnzippedPath, vaultToolName, version);
    }

    let vaultPath = findvaultExecutable(cachedToolPath);
    if (!vaultPath) {
        throw new Error(tasks.loc("vaultNotFoundInFolder", cachedToolPath));
    }

    if (!isWindows) {
        fs.chmodSync(vaultPath, "777");
    }

    tasks.setVariable('vaultLocation', vaultPath);

    return vaultPath;
}

function getvaultDownloadUrl(version: string): string {
    let platform: string;
    let architecture: string;

    switch(os.type()) {
        case "Darwin":
            platform = "darwin";
            break;
        
        case "Linux":
            platform = "linux";
            break;
        
        case "Windows_NT":
            platform = "windows";
            break;
        
        default:
            throw new Error(tasks.loc("OperatingSystemNotSupported", os.type()));
    }

    switch(os.arch()) {
        case "x64":
            architecture = "amd64";
            break;
        
        case "x32":
            architecture = "386";
            break;
        
        default:
            throw new Error(tasks.loc("ArchitectureNotSupported", os.arch()));
    }

    return `https://releases.hashicorp.com/vault/${version}/vault_${version}_${platform}_${architecture}.zip`;
}

function findvaultExecutable(rootFolder: string): string {
    let vaultPath = path.join(rootFolder, vaultToolName + getExecutableExtension());
    var allPaths = tasks.find(rootFolder);
    var matchingResultFiles = tasks.match(allPaths, vaultPath, rootFolder);
    return matchingResultFiles[0];
}

function getExecutableExtension(): string {
    if (isWindows) {
        return ".exe";
    }

    return "";
}