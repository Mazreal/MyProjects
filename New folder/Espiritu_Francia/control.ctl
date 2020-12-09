LOAD DATA 
INFILE 'C:\SAIT\Semester_3\CPRG-307_Database\Espiritu_Francia_A2\payroll.txt'
REPLACE INTO TABLE payroll_load FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '"' TRAILING NULLCOLS (payroll_date DATE "Month dd, yyyy", employee_id, amount, status)