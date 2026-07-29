$terms = @("InteractiveGame", "practiceQuestions", "curriculum", "Lesson 3", "checkUp")
$files = Get-ChildItem -Path "src" -Recurse -Include *.ts, *.tsx, *.json

foreach ($file in $files) {
    if ($file.FullName -like "*node_modules*" -or $file.FullName -like "*.git*") {
        continue
    }
    $content = Get-Content -Path $file.FullName -Raw
    $found = @()
    foreach ($term in $terms) {
        if ($content.Contains($term)) {
            $found += $term
        }
    }
    if ($found.Count -gt 0) {
        Write-Output "$($file.Name): found [$($found -join ', ')]"
    }
}

