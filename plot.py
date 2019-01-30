import matplotlib.pyplot as plt
import csv
import pandas as pd

data = pd.read_csv('good_run.csv')

plt.plot(data['maximum'], label='maximum')
plt.plot(data['mean'], label='mean')
plt.plot(data['minimum'], label='minimum')

plt.legend()
plt.show()