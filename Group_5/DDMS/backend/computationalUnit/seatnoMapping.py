from tabula import read_pdf
import pandas as pd
import sys

file = sys.argv[1]
tables = read_pdf(file,multiple_tables=True, pages="all")

for table in tables:
    df = pd.DataFrame(table, dtype=object)
    df = df.drop(['Mother'], axis=1)
    df = df.dropna()
    df.rename(columns={"SeatNo":"examseatno", "Student Name":"fullname", "PRN":"prn"}, inplace=True)
    print(df.to_json(orient='records') + "|")
    sys.stdout.flush()
