@echo off
cd "C:\Users\evlldwr\OneDrive - Ericsson\Documents\9. repository\KR\akashicRecords\py"

:: Start Flask server in a new command window
start cmd /k "python app.py"

:: Wait before opening the browser (to make sure Flask server starts)
timeout /t 5

:: Open the HTML in Chrome (you can change this if using a different browser)
start chrome http://127.0.0.1:8000

:: Keep the batch window open
pause
