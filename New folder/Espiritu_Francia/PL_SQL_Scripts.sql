CREATE OR REPLACE FUNCTION func_user_perm
(p_username VARCHAR2) 
RETURN CHAR
IS 

v_permission VARCHAR2(20); 

BEGIN

	SELECT privilege 
	INTO v_permission
	FROM user_tab_privs
	WHERE grantee = p_username AND 
	table_name = 'UTL_FILE'; 
	
	IF(v_permission = 'EXECUTE') THEN 
	RETURN 'Y'; 
	END IF; 

EXCEPTION
	WHEN no_data_found THEN
		RETURN 'N';
END; 
/
---------------------------------------------------
CREATE OR REPLACE TRIGGER new_trans_air
BEFORE
INSERT
ON payroll_load
FOR EACH ROW
DECLARE
	v_trans_number NUMBER:= wkis_seq.NEXTVAL;
BEGIN
	
	INSERT INTO new_transactions
	VALUES(v_trans_number, :NEW.payroll_date, 'Payroll processed', 2050, 'C', :NEW.amount);
	
	INSERT INTO new_transactions
	VALUES(v_trans_number, :NEW.payroll_date, 'Payroll processed', 4045, 'D', :NEW.amount);
	
	:NEW.status := 'G';
	
EXCEPTION
	WHEN others THEN
	 :NEW.status := 'B';
END;
/
---------------------------------------------------

CREATE OR REPLACE PROCEDURE proc_end_month IS

BEGIN
	DECLARE
	CURSOR c_acc IS
	 SELECT *
	 FROM account
	 WHERE account_type_code IN ('RE','EX');
	
	v_trans_number 	NUMBER;
	BEGIN
		FOR r_acc IN c_acc LOOP
			IF(r_acc.account_balance != 0) THEN
			
				v_trans_number := wkis_seq.NEXTVAL;
				
				IF(r_acc.account_type_code = 'RE') THEN
					INSERT INTO new_transactions
					 VALUES(v_trans_number, SYSDATE, 'Monthend roll to owners equity',  r_acc.account_no, 'D', r_acc.account_balance);
					
					INSERT INTO new_transactions
					 VALUES(v_trans_number, SYSDATE, 'Monthend roll to owners equity',  5555, 'C', r_acc.account_balance);
					 
				ELSE
					INSERT INTO new_transactions
					 VALUES(v_trans_number, SYSDATE, 'Monthend roll to owners equity',  r_acc.account_no, 'C', r_acc.account_balance);
					
					INSERT INTO new_transactions
					 VALUES(v_trans_number, SYSDATE, 'Monthend roll to owners equity',  5555, 'D', r_acc.account_balance);
				END IF;
			END IF;
		END LOOP;
	END;
END;
/

---------------------------------------------------
CREATE OR REPLACE PROCEDURE proc_pop_file
(p_alias VARCHAR2, p_filename VARCHAR2) AS

	CURSOR c_new_trans IS
	 SELECT *
	 FROM new_transactions;

	v_file UTL_FILE.file_type;
BEGIN
	v_file := UTL_FILE.FOPEN (p_alias, p_filename,'w', 32760);
	FOR r_newTrans IN c_new_trans LOOP

		UTL_FILE.PUT_LINE(v_file,
			r_newTrans.transaction_no || ',' ||
			r_newTrans.transaction_date || ',' ||
			r_newTrans.description || ',' ||
			r_newTrans.account_no || ',' ||
			r_newTrans.transaction_type || ',' ||
			r_newTrans.transaction_amount, FALSE);
	END LOOP;
	UTL_FILE.FCLOSE(v_file);
END;
/