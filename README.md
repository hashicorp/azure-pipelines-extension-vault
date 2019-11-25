# Azure Pipelines Extension for Vault

This repository contains the source for an Azure Pipelines extension that provides Tasks to easily install and use Vault.

This extension provides a `VaultInstaller` task to ease in installing specific Vault versions, as well as a `Vault` task to help call Vault without needing to manage authentication yourself.  The `Vault` task wraps ... options.

`CLI` is used to execute a custom script in a pre-authenticated environment.  This can be a great option if you need to use more complex Vault scripts, such as gathering output and setting it to a Piplelines variable (see example below).

Once this task has been added to your Organization from the Azure DevOps Marketplace you can use it in any Azure Pipelines build or release job.  It is available in both the GUI pipeline editor as well as yaml templates.
