import { OperatingSystem } from '../types';

type Scripts = {
    sync_agentbash: string;
};

export const ONBOARDING_SCRIPTS: Record<OperatingSystem, Scripts> = {
    [OperatingSystem.Linux]: {
        sync_agentbash: `#!/bin/bash
# AgentBash Sync Script v2.0
# This single script checks dependencies, profiles the system, and sets up VS Code.

# --- Colors for Output ---
CYAN='\\033[0;36m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
RED='\\033[0;31m'
NC='\\033[0m' # No Color

echo -e "$\{CYAN\}#################################$\{NC\}"
echo -e "$\{CYAN\}### AgentBash Environment Sync ###$\{NC\}"
echo -e "$\{CYAN\}#################################$\{NC\}"

# --- PART 1: Dependency Check ---
echo -e "\\n$\{CYAN\}--- 1. Checking Dependencies ---$\{NC\}"
TOOLS_TO_CHECK=("git" "node" "npm" "python3" "python" "docker" "go" "rustc" "code")
ALL_FOUND=true
for tool in "$\{TOOLS_TO_CHECK[@]}"; do
    if command -v $tool &> /dev/null; then
        VERSION=$($tool --version 2>&1 | head -n 1)
        echo -e "✅ $\{GREEN\}"$tool"$\{NC\}: Found ($VERSION)"
    else
        if [ "$tool" == "python" ] && command -v python3 &> /dev/null; then
            VERSION=$(python3 --version 2>&1 | head -n 1)
             echo -e "✅ $\{GREEN\}python (as python3) $\{NC\}: Found ($VERSION)"
        else
            echo -e "❌ $\{YELLOW\}"$tool"$\{NC\}: Not Found"
            ALL_FOUND=false
        fi
    fi
done
if [ "$ALL_FOUND" = true ]; then
    echo -e "✨ $\{GREEN\}All essential tools seem to be installed!$\{NC\}"
else
    echo -e "⚠️ $\{YELLOW\}Some tools are missing. Please install them using your system's package manager.$\{NC\}"
fi

# --- PART 2: System Profiler ---
echo -e "\\n$\{CYAN\}--- 2. Gathering System Profile ---$\{NC\}"
AGENTBASH_DIR="$HOME/.agentbash"
OUTPUT_FILE="$AGENTBASH_DIR/system_profile.txt"
if [ ! -d "$AGENTBASH_DIR" ]; then
    echo "Creating directory: $AGENTBASH_DIR"
    mkdir -p "$AGENTBASH_DIR"
fi
> "$OUTPUT_FILE"
profile() {
    echo -e "\\n--- $1 ---\\n" >> "$OUTPUT_FILE"
    if command -v $2 &>/dev/null; then
        eval "$3" >> "$OUTPUT_FILE" 2>&1
    else
        echo "Command not found: $2" >> "$OUTPUT_FILE"
    fi
}
profile "OPERATING SYSTEM" "uname" "uname -a"
profile "LINUX DISTRIBUTION" "lsb_release" "lsb_release -a"
profile "OS-RELEASE INFO" "cat" "cat /etc/*-release"
profile "CPU INFORMATION" "lscpu" "lscpu"
profile "MEMORY USAGE" "free" "free -h"
profile "DISK USAGE" "df" "df -h"
profile "ENVIRONMENT VARIABLES" "printenv" "printenv | sort"
echo -e "✅ $\{GREEN\}System profile saved to: $OUTPUT_FILE$\{NC\}"
echo -e "\\n✨ $\{YELLOW\}CRITICAL: Please copy the entire block below (from BEGIN to END) and paste it into the AgentBash chat.$\{NC\}"
echo "--------------------------- BEGIN SYSTEM PROFILE ---------------------------"
cat "$OUTPUT_FILE"
echo "---------------------------- END SYSTEM PROFILE ----------------------------"

# --- PART 3: Optional: VS Code Setup ---
echo -e "\\n$\{CYAN\}--- 3. Optional: VS Code Setup ---$\{NC\}"
read -p "Do you want to install/update VS Code and recommended extensions? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v code &> /dev/null; then
        echo -e "✅ $\{GREEN\}VS Code is already installed. Updating extensions...$\{NC\}"
    else
        echo "VS Code not found. Attempting installation..."
        if command -v apt-get &> /dev/null; then
            echo "Detected Debian/Ubuntu..."
            sudo apt-get update >/dev/null && sudo apt-get install -y wget gpg apt-transport-https >/dev/null
            wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
            sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
            sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
            rm -f packages.microsoft.gpg
            sudo apt-get update >/dev/null && sudo apt-get install -y code
        elif command -v dnf &> /dev/null || command -v yum &> /dev/null; then
            echo "Detected Fedora/RHEL..."
            sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
            sudo sh -c 'echo -e "[code]\\nname=Visual Studio Code\\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\\nenabled=1\\ngpgcheck=1\\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
            sudo dnf check-update >/dev/null && sudo dnf install -y code || sudo yum install -y code
        else
            echo -e "⚠️ $\{RED\}Unsupported package manager. Please install VS Code manually.$\{NC\}"
        fi
    fi

    if command -v code &> /dev/null; then
        echo "Installing extensions..."
        EXTENSIONS=("esbenp.prettier-vscode" "dbaeumer.vscode-eslint" "ms-python.python" "ms-vscode.go" "rust-lang.rust-analyzer" "ms-azuretools.vscode-docker" "github.copilot" "ms-vscode-remote.remote-ssh" "redhat.vscode-yaml" "hashicorp.terraform")
        for ext in "$\{EXTENSIONS[@]}"; do code --install-extension "$ext" --force >/dev/null; done
        echo -e "✅ $\{GREEN\}Extensions installed.$\{NC\}"
    else
         echo -e "❌ $\{RED\}VS Code installation failed or not found. Skipping extension install.$\{NC\}"
    fi
else
    echo "Skipping VS Code setup."
fi

echo -e "\\n$\{GREEN\}### Sync Complete! ###$\{NC\}"
`,
    },
    [OperatingSystem.Windows]: {
        sync_agentbash: `# AgentBash Sync Script v2.0
# This single script checks dependencies, profiles the system, and sets up VS Code.
Write-Host "#################################" -ForegroundColor Cyan
Write-Host "### AgentBash Environment Sync ###" -ForegroundColor Cyan
Write-Host "#################################" -ForegroundColor Cyan

# --- PART 1: Dependency Check ---
Write-Host "\`n--- 1. Checking Dependencies ---" -ForegroundColor Cyan
\$tools = "git", "node", "npm", "python", "docker", "go", "rustc", "code"
\$allFound = \$true
foreach (\$tool in \$tools) {
    if (Get-Command \$tool -ErrorAction SilentlyContinue) {
        try {
            \$version = (Invoke-Expression "\$tool --version" 2>&1 | Select-Object -First 1) -join " "
            Write-Host "✅ \$(\$tool): Found (\$version)" -ForegroundColor Green
        } catch {
            Write-Host "✅ \$(\$tool): Found (version check failed)" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ \$(\$tool): Not Found" -ForegroundColor Yellow
        \$allFound = \$false
    }
}
if (\$allFound) {
    Write-Host "✨ All essential tools seem to be installed!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Some tools are missing. Please install them using Winget or Chocolatey." -ForegroundColor Yellow
}

# --- PART 2: System Profiler ---
Write-Host "\`n--- 2. Gathering System Profile ---" -ForegroundColor Cyan
\$agentBashDir = Join-Path \$HOME ".agentbash"
\$outputFile = Join-Path \$agentBashDir "system_profile.txt"
if (-not (Test-Path \$agentBashDir)) {
    Write-Host "Creating directory: \$agentBashDir"
    New-Item -Path \$agentBashDir -ItemType Directory -Force | Out-Null
}
Clear-Content -Path \$outputFile -ErrorAction SilentlyContinue
function Profile-System {
    param([string]\$Title, [scriptblock]\$Command)
    ("--- " + \$Title.ToUpper() + "---\`n") | Add-Content -Path \$outputFile
    try {
        Invoke-Command -ScriptBlock \$Command | Out-String | Add-Content -Path \$outputFile
    } catch { "Failed to execute command for \$Title" | Add-Content -Path \$outputFile }
}
Profile-System "OPERATING SYSTEM" { Get-ComputerInfo | Select-Object OsName, OsVersion, OsArchitecture, CsSystemType }
Profile-System "HARDWARE" { Get-ComputerInfo | Select-Object CsProcessors, CsNumberOfLogicalProcessors, PhisicalMemorySize, CsManufacturer, CsModel }
Profile-System "DISK USAGE" { Get-Volume | Format-Table -AutoSize }
Profile-System "ENVIRONMENT VARIABLES" { Get-ChildItem Env: | Sort-Object Name | Format-Table -AutoSize }
Write-Host "✅ System profile saved to: \$outputFile" -ForegroundColor Green
Write-Host "\`n✨ CRITICAL: Please copy the entire block below (from BEGIN to END) and paste it into the AgentBash chat." -ForegroundColor Yellow
Write-Host "--------------------------- BEGIN SYSTEM PROFILE ---------------------------"
Get-Content \$outputFile
Write-Host "---------------------------- END SYSTEM PROFILE ----------------------------"

# --- PART 3: Optional: VS Code Setup ---
Write-Host "\`n--- 3. Optional: VS Code Setup ---" -ForegroundColor Cyan
\$choice = Read-Host "Do you want to install/update VS Code, Git, and Node.js (LTS)? (y/n)"
if (\$choice -eq 'y') {
    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        Write-Host "⚠️ Winget not found. Please install 'App Installer' from the Microsoft Store first." -ForegroundColor Red
    } else {
        Write-Host "Installing/updating tools via Winget..."
        winget install --id Microsoft.VisualStudioCode -e --accept-source-agreements --accept-package-agreements
        winget install --id Git.Git -e --accept-source-agreements --accept-package-agreements
        winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements

        if (Get-Command code -ErrorAction SilentlyContinue) {
            Write-Host "Installing extensions..."
            \$extensions = "esbenp.prettier-vscode", "dbaeumer.vscode-eslint", "ms-python.python", "ms-vscode.go", "rust-lang.rust-analyzer", "ms-azuretools.vscode-docker", "github.copilot", "ms-vscode-remote.remote-ssh", "redhat.vscode-yaml", "hashicorp.terraform"
            foreach (\$ext in \$extensions) { code --install-extension \$ext --force }
            Write-Host "✅ Extensions installed." -ForegroundColor Green
        } else {
            Write-Host "❌ VS Code not found after install attempt. Skipping extension install." -ForegroundColor Red
        }
    }
} else {
    Write-Host "Skipping tool setup."
}

Write-Host "\`n### Sync Complete! ###" -ForegroundColor Green
Write-Host "Please RESTART your terminal for PATH changes (git, node) to take effect." -ForegroundColor Yellow
`,
    },
};
