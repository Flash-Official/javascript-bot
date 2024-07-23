import sys
import os
import wolframalpha
from dotenv import load_dotenv,dotenv_values
load_dotenv()
q=sys.argv[1]
client = wolframalpha.Client(os.getenv("WOLFFRAMALPHA"))
res=client.query(q)
answer = next(res.results).text
print(answer)