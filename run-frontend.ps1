$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodePath = Join-Path $root "node_local\node"
$env:Path = "$nodePath;$env:Path"

Set-Location $root
& .\node_local\node\npm.cmd run dev -- --host 127.0.0.1 --port 5173
