import oracledb

un = '<username>'
pw = '<password>'
cs = '<public-ip>:1521/FREEPDB1'

with oracledb.connect(user=un, password=pw, dsn=cs) as connection:
    with connection.cursor() as cursor:
        sql = """select ename, empno, sal, hiredate from emp"""
        for r in cursor.execute(sql):
            print(r)


