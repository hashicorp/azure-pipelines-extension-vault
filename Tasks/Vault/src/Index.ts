import "reflect-metadata";
import { Container } from "inversify";
import { TaskResult } from "azure-pipelines-task-lib/task";
import task = require('azure-pipelines-task-lib/task');

import { VaultTask } from './VaultTask';
import { VaultClient } from "./VaultClient";
import { VaultAuthenticationClient } from "./VaultAuthenticationClient";
import { Options } from './Options'

import { TaskOptions } from './TaskOptions';
import { VaultAuthenticationProvider } from './AuthenticationProviders/VaultAuthenticationProvider'
import { TokenAuthenticationProvider } from './AuthenticationProviders/Token/TokenAuthenticationProvider'
import { TokenAuthenticationOptions } from './AuthenticationProviders/Token/TokenAuthenticationOptions'
import { UserpassAuthenticationProvider } from './AuthenticationProviders/Userpass/UserpassAuthenticationProvider'
import { UserpassAuthenticationOptions } from './AuthenticationProviders/Userpass/UserpassAuthenticationOptions'
import { GitHubAuthenticationProvider } from './AuthenticationProviders/GitHub/GitHubAuthenticationProvider'
import { GitHubAuthenticationOptions } from './AuthenticationProviders/GitHub/GitHubAuthenticationOptions'

let container = new Container();

// Bind Vault task classes for DI
container.bind(VaultTask).toSelf()
container.bind(VaultClient).toSelf();
container.bind(VaultAuthenticationClient).toSelf();
container.bind<TaskOptions>(TaskOptions).toDynamicValue((context) => {
    return Options.load(TaskOptions); 
});

let options = container.get(TaskOptions);

// Bind appropriate auth and auth options providers
switch (options.authMethod) {
    case "Token":
        container.bind(VaultAuthenticationProvider).to(TokenAuthenticationProvider);
        container.bind<TokenAuthenticationOptions>(TokenAuthenticationOptions).toDynamicValue((context) => {
            return Options.load(TokenAuthenticationOptions); 
        });

        break;
    case "UsernamePassword":
        container.bind(VaultAuthenticationProvider).to(UserpassAuthenticationProvider);
        container.bind<UserpassAuthenticationOptions>(UserpassAuthenticationOptions).toDynamicValue((context) => {
            return Options.load(UserpassAuthenticationOptions); 
        });

        break;
    case "endpoint-auth-scheme-github":
        container.bind(VaultAuthenticationProvider).to(GitHubAuthenticationProvider);
        container.bind<GitHubAuthenticationOptions>(GitHubAuthenticationOptions).toDynamicValue((context) => {
            return Options.load(GitHubAuthenticationOptions); 
        });

        break;
    default:
        break;
}

// Get and run the Vault task
var vaultTask = container.get<VaultTask>(VaultTask);

vaultTask.run().then(function() 
{
    task.setResult(TaskResult.Succeeded, "Vault successfully ran");
}, function(reason) {
    task.setResult(TaskResult.Failed, "Vault failed to run - " + reason);
});
