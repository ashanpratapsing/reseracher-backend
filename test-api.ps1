#!/usr/bin/env pwsh

Write-Host "===================================================="
Write-Host "   BACKEND API COMPLETE TEST SUITE"
Write-Host "===================================================" -ForegroundColor Green
Write-Host ""

$baseUrl = "http://localhost:5000"
$passed = 0
$failed = 0

# Test 1: Health Check
Write-Host "[1] Testing Server Health..."
try {
  $response = Invoke-WebRequest -Uri "$baseUrl/" -UseBasicParsing -ErrorAction Stop
  if ($response.StatusCode -eq 200) {
    Write-Host "    [OK] Server is running on $baseUrl" -ForegroundColor Green
    Write-Host "    Response: $($response.Content)" -ForegroundColor Green
    Write-Host ""
    $passed++
  } else {
    Write-Host "    [FAIL] Unexpected response code: $($response.StatusCode)" -ForegroundColor Red
    Write-Host ""
    $failed++
  }
} catch {
  Write-Host "    [FAIL] Server not responding: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host ""
  $failed++
  exit 1
}

# Test 2: GET All Papers
Write-Host "[2] Testing GET /api/papers..."
try {
  $response = Invoke-WebRequest -Uri "$baseUrl/api/papers" -UseBasicParsing -ErrorAction Stop
  if ($response.StatusCode -eq 200) {
    $papers = $response.Content | ConvertFrom-Json
    Write-Host "    [OK] Retrieved $($papers.Count) papers" -ForegroundColor Green
    $papers | Select-Object -First 3 | ForEach-Object {
      Write-Host "       - $($_.title) by $($_.author)" -ForegroundColor Green
    }
    if ($papers.Count -gt 3) { Write-Host "       - ... and $($papers.Count - 3) more" -ForegroundColor Green }
    Write-Host ""
    $passed++
  }
} catch {
  Write-Host "    [FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host ""
  $failed++
}

# Test 3: POST - Create New Paper
Write-Host "[3] Testing POST /api/papers (Create)..."
try {
  $newPaper = @{
    title = "Test Paper: Backend API Validation"
    author = "Admin"
    domain = "Testing"
    stage = "Published"
    citations = 99
    impact = "Very High"
    date = "2026-03-01"
  } | ConvertTo-Json

  $response = Invoke-WebRequest -Uri "$baseUrl/api/papers" `
    -Method POST `
    -ContentType "application/json" `
    -Body $newPaper `
    -UseBasicParsing `
    -ErrorAction Stop

  if ($response.StatusCode -eq 200) {
    $created = $response.Content | ConvertFrom-Json
    $paperId = $created[0].id
    Write-Host "    [OK] Paper created successfully" -ForegroundColor Green
    Write-Host "       ID: $paperId" -ForegroundColor Green
    Write-Host "       Title: $($created[0].title)" -ForegroundColor Green
    Write-Host ""
    $passed++
  }
} catch {
  Write-Host "    [FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host ""
  $failed++
}

# Test 4: GET - Verify New Paper Added
Write-Host "[4] Testing GET - Verify New Paper..."
try {
  $response = Invoke-WebRequest -Uri "$baseUrl/api/papers" -UseBasicParsing -ErrorAction Stop
  $papers = $response.Content | ConvertFrom-Json
  $testPaper = $papers | Where-Object { $_.title -like "*Backend API Validation*" }
  
  if ($testPaper) {
    Write-Host "    [OK] New paper found in database" -ForegroundColor Green
    Write-Host "       Citations: $($testPaper.citations)" -ForegroundColor Green
    Write-Host ""
    $passed++
    $testPaperId = $testPaper.id
  } else {
    Write-Host "    [FAIL] Paper not found" -ForegroundColor Red
    Write-Host ""
    $failed++
  }
} catch {
  Write-Host "    [FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host ""
  $failed++
}

# Test 5: PUT - Update Paper
Write-Host "[5] Testing PUT /api/papers/:id (Update)..."
try {
  $updateData = @{
    citations = 150
    impact = "Critical"
  } | ConvertTo-Json

  $response = Invoke-WebRequest -Uri "$baseUrl/api/papers/$testPaperId" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $updateData `
    -UseBasicParsing `
    -ErrorAction Stop

  if ($response.StatusCode -eq 200) {
    $updated = $response.Content | ConvertFrom-Json
    Write-Host "    [OK] Paper updated successfully" -ForegroundColor Green
    Write-Host "       New Citations: $($updated.citations)" -ForegroundColor Green
    Write-Host "       New Impact: $($updated.impact)" -ForegroundColor Green
    Write-Host ""
    $passed++
  }
} catch {
  Write-Host "    [FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host ""
  $failed++
}

# Test 6: DELETE - Remove Paper
Write-Host "[6] Testing DELETE /api/papers/:id (Delete)..."
try {
  $response = Invoke-WebRequest -Uri "$baseUrl/api/papers/$testPaperId" `
    -Method DELETE `
    -UseBasicParsing `
    -ErrorAction Stop

  if ($response.StatusCode -eq 200) {
    Write-Host "    [OK] Paper deleted successfully" -ForegroundColor Green
    Write-Host ""
    $passed++
  }
} catch {
  Write-Host "    [FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host ""
  $failed++
}

# Test 7: Verify Deletion
Write-Host "[7] Testing - Verify Deletion..."
try {
  $response = Invoke-WebRequest -Uri "$baseUrl/api/papers" -UseBasicParsing -ErrorAction Stop
  $papers = $response.Content | ConvertFrom-Json
  $deletedPaper = $papers | Where-Object { $_.id -eq $testPaperId }
  
  if (-not $deletedPaper) {
    Write-Host "    [OK] Paper successfully removed from database" -ForegroundColor Green
    Write-Host ""
    $passed++
  } else {
    Write-Host "    [FAIL] Paper still exists" -ForegroundColor Red
    Write-Host ""
    $failed++
  }
} catch {
  Write-Host "    [FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host ""
  $failed++
}

# Summary
Write-Host "===================================================="
Write-Host "   TEST RESULTS SUMMARY"
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tests Passed: $passed" -ForegroundColor Green
Write-Host "Tests Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($failed -eq 0) {
  Write-Host "*** ALL TESTS PASSED! Backend is working perfectly! ***" -ForegroundColor Green
  Write-Host ""
  Write-Host "Database Status:"
  $finalResponse = Invoke-WebRequest -Uri "$baseUrl/api/papers" -UseBasicParsing -ErrorAction Stop
  $finalPapers = $finalResponse.Content | ConvertFrom-Json
  Write-Host "   Total Papers: $($finalPapers.Count)" -ForegroundColor Cyan
  Write-Host "   Sample Papers:" -ForegroundColor Cyan
  $finalPapers | Select-Object -First 3 | ForEach-Object {
    Write-Host "   - $($_.title)" -ForegroundColor Cyan
  }
} else {
  Write-Host "*** Some tests failed. Please check the errors above. ***" -ForegroundColor Red
  exit 1
}
