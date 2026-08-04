@echo off
setlocal
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  py "%~dp0actualizar_galeria.py"
) else (
  python "%~dp0actualizar_galeria.py"
)
if errorlevel 1 pause
endlocal
