param(
    [string]$ProjectRoot = "."
)

$root = (Resolve-Path $ProjectRoot).Path

Write-Host "Creating GXShift structure in: $root" -ForegroundColor Green

function Ensure-Dir {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
        Write-Host "[DIR ] $Path" -ForegroundColor Cyan
    }
}

function Ensure-File {
    param([string]$Path)

    $dir = Split-Path $Path -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    if (-not (Test-Path $Path)) {
        New-Item -ItemType File -Path $Path -Force | Out-Null
        Write-Host "[FILE] $Path" -ForegroundColor Yellow
    }
}

# =========================
# FOLDERS
# =========================
$folders = @(
    "$root\src",
    "$root\src\app",
    "$root\src\app\(public)",
    "$root\src\app\(public)\login",

    "$root\src\app\(dashboard)",
    "$root\src\app\(dashboard)\user",
    "$root\src\app\(dashboard)\user\order",
    "$root\src\app\(dashboard)\admin",
    "$root\src\app\(dashboard)\admin\orders",

    "$root\src\app\api",
    "$root\src\app\api\mock",

    "$root\src\components",
    "$root\src\components\ui",
    "$root\src\components\layout",
    "$root\src\components\features",
    "$root\src\components\features\landing",
    "$root\src\components\features\orders",

    "$root\src\lib",
    "$root\src\types"
)

foreach ($folder in $folders) {
    Ensure-Dir $folder
}

# =========================
# FILES
# =========================
$files = @(
    # app
    "$root\src\app\(public)\page.tsx",
    "$root\src\app\(public)\login\page.tsx",

    "$root\src\app\(dashboard)\layout.tsx",
    "$root\src\app\(dashboard)\user\page.tsx",
    "$root\src\app\(dashboard)\user\order\page.tsx",
    "$root\src\app\(dashboard)\admin\page.tsx",
    "$root\src\app\(dashboard)\admin\orders\page.tsx",

    "$root\src\app\api\mock\route.ts",
    "$root\src\app\layout.tsx",
    "$root\src\app\globals.css",

    # lib
    "$root\src\lib\constants.ts",
    "$root\src\lib\security.ts",
    "$root\src\lib\utils.ts",

    # types
    "$root\src\types\index.ts",

    # middleware (sesuai struktur yang kamu minta)
    "$root\src\middleware.ts",

    # root config
    "$root\tailwind.config.ts",
    "$root\next.config.mjs"
)

foreach ($file in $files) {
    Ensure-File $file
}

Write-Host ""
Write-Host "GXShift folder and file structure created successfully." -ForegroundColor Green